import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { HubConnectionState } from '@microsoft/signalr';
import * as alertify from 'alertifyjs';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgZone } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignalRService } from 'app/project/services/signal-r.service';

@Component({
  selector: 'app-voicechat',
  standalone: true,
  imports: [
    MatOption,
    MatSelectModule,
  ],
  templateUrl: './voicechat.component.html',
  styleUrl: './voicechat.component.scss'
})
export class VoicechatComponent implements AfterViewInit, OnInit {

  CallingMode = CallingMode;
  CallingMessage = "Calling";
  currentCallingMode: CallingMode = CallingMode.Idel;
  isEdge = navigator.userAgent.indexOf('Edge') !== -1 &&
    (typeof (navigator as any).msSaveOrOpenBlob !== 'undefined' || typeof (navigator as any).msSaveBlob !== 'undefined');
  isOpera = typeof (window as any).opera !== 'undefined' || navigator.userAgent.indexOf(' OPR/') >= 0;
  isFirefox = typeof (window as any).InstallTrigger !== 'undefined';
  isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  isChrome = !!(window as any).chrome && !this.isOpera;
  isIE = typeof document !== 'undefined' && !!(document as any).documentMode && !this.isEdge;
  edgeVersion = this.isEdge ? navigator.userAgent.split('Edge/')[1]?.split('.')[0] ?? '' : '';
  isDebugging = true;
  wsconn: signalR.HubConnection;
  webrtcConstraints = { audio: true, video: false };
  WOWZA_STREAM_NAME = null;
  connections = {};
  localStream = null;
  streamInfo = { applicationName: WOWZA_APPLICATION_NAME, streamName: this.WOWZA_STREAM_NAME, sessionId: WOWZA_SESSION_ID_EMPTY };
  myConnectionId: string;
  updatedUserList: voicechatUser[];
  partnerConnectionId: string;
  username: string;
  currentCallingUser: any = undefined;
  constructor(
    private route: ActivatedRoute,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public input_data: any) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      console.log('Username from URL:', this.username);
    });
    this.username = this.input_data.username;
  }
  ngAfterViewInit(): void {
    this.initializeSignalR();
    this.currentCallingMode = CallingMode.Idel;
    // Add handler for the hangup button
  }

  HangUp() {
    console.log('hangup....');
    // Only allow hangup if we are not idle
    //localStream.getTracks().forEach(track => track.stop());
    if (this.currentCallingMode !== CallingMode.Idel) {
      this.wsconn.invoke('hangUp');
      this.closeAllConnections();
      this.currentCallingMode = CallingMode.Idel;
    }
  }

  callUser(targetConnectionId: string) {
    console.log('calling user... ');
    // Find the target user's SignalR client id

    // Make sure we are in a state where we can make a call
    if (this.currentCallingMode !== CallingMode.Idel) {
      alertify.error('Sorry, you are already in a call.  Conferencing is not yet implemented.');
      return;
    }

    // Then make sure we aren't calling ourselves.
    if (targetConnectionId != this.myConnectionId) {
      // Initiate a call
      this.wsconn.invoke('callUser', { "connectionId": targetConnectionId });

      // UI in calling mode
      this.currentCallingMode = CallingMode.Calling;
    } else {
      alertify.error("Ah, nope.  Can't call yourself.");
    }
  }

  attachMediaStream = (e) => {
    //console.log(e);
    console.log("OnPage: called attachMediaStream");
    var partnerAudio = document.getElementById('audio-partner') as HTMLMediaElement;;
    if (partnerAudio.srcObject !== e) {
      partnerAudio.srcObject = e;
      console.log("OnPage: Attached remote stream");
    }
  };

  receivedCandidateSignal = (connection, partnerClientId, candidate) => {
    //console.log('candidate', candidate);
    //if (candidate) {
    console.log('WebRTC: adding full candidate');
    connection.addIceCandidate(new RTCIceCandidate(candidate), () => console.log("WebRTC: added candidate successfully"), () => console.log("WebRTC: cannot add candidate"));
    //} else {
    //    console.log('WebRTC: adding null candidate');
    //   connection.addIceCandidate(null, () => console.log("WebRTC: added null candidate successfully"), () => console.log("WebRTC: cannot add null candidate"));
    //}
  }

  // Process a newly received SDP signal
  receivedSdpSignal = (connection, partnerClientId, sdp) => {
    console.log('connection: ', connection);
    console.log('sdp', sdp);
    console.log('WebRTC: called receivedSdpSignal');
    console.log('WebRTC: processing sdp signal');
    connection.setRemoteDescription(new RTCSessionDescription(sdp), () => {
      console.log('WebRTC: set Remote Description');
      if (connection.remoteDescription.type == "offer") {
        console.log('WebRTC: remote Description type offer');
        connection.addStream(this.localStream);
        console.log('WebRTC: added stream');
        connection.createAnswer().then((desc) => {
          console.log('WebRTC: create Answer...');
          connection.setLocalDescription(desc, () => {
            console.log('WebRTC: set Local Description...');
            console.log('connection.localDescription: ', connection.localDescription);
            //setTimeout(() => {
            this.sendHubSignal(JSON.stringify({ "sdp": connection.localDescription }), partnerClientId);
            //}, 1000);
          }, this.errorHandler);
        }, this.errorHandler);
      } else if (connection.remoteDescription.type == "answer") {
        console.log('WebRTC: remote Description type answer');
      }
    }, this.errorHandler);
  }

  // Hand off a new signal from the signaler to the connection
  newSignal = (partnerClientId, data) => {
    console.log('WebRTC: called newSignal');
    //console.log('connections: ', connections);

    var signal = JSON.parse(data);
    var connection = this.getConnection(partnerClientId);
    //console.log("signal: ", signal);
    //console.log("signal: ", signal.sdp || signal.candidate);
    //console.log("partnerClientId: ", partnerClientId);
    console.log("connection: ", connection);

    // Route signal based on type
    if (signal.sdp) {
      console.log('WebRTC: sdp signal');
      this.receivedSdpSignal(connection, partnerClientId, signal.sdp);
    } else if (signal.candidate) {
      console.log('WebRTC: candidate signal');
      this.receivedCandidateSignal(connection, partnerClientId, signal.candidate);
    } else {
      console.log('WebRTC: adding null candidate');
      connection.addIceCandidate(null, () => console.log("WebRTC: added null candidate successfully"), () => console.log("WebRTC: cannot add null candidate"));
    }
  }

  onReadyForStream = (connection) => {
    console.log("WebRTC: called onReadyForStream");
    // The connection manager needs our stream
    //console.log("onReadyForStream connection: ", connection);
    connection.addStream(this.localStream);
    console.log("WebRTC: added stream");
  }

  onStreamRemoved = (connection, streamId) => {
    console.log("WebRTC: onStreamRemoved -> Removing stream: ");
    //console.log("Stream: ", streamId);
    //console.log("connection: ", connection);
  }
  // Close the connection between myself and the given partner
  closeConnection = (partnerClientId) => {
    console.log("WebRTC: called closeConnection ");
    var connection = this.connections[partnerClientId];

    if (connection) {
      // Let the user know which streams are leaving
      // todo: foreach connection.remoteStreams -> onStreamRemoved(stream.id)
      this.onStreamRemoved(null, null);

      // Close the connection
      connection.close();
      delete this.connections[partnerClientId]; // Remove the property
    }
  }
  // Close all of our connections
  closeAllConnections = () => {
    console.log("WebRTC: call closeAllConnections ");
    for (var connectionId in this.connections) {
      this.closeConnection(connectionId);
    }
  }

  getConnection = (partnerClientId) => {
    console.log("WebRTC: called getConnection");
    if (this.connections[partnerClientId]) {
      console.log("WebRTC: connections partner client exist");
      return this.connections[partnerClientId];
    }
    else {
      console.log("WebRTC: initialize new connection");
      return this.initializeConnection(partnerClientId)
    }
  }

  initiateOffer = (partnerClientId, stream) => {
    console.log('WebRTC: called initiateoffer: ');
    var connection = this.getConnection(partnerClientId); // // get a connection for the given partner
    //console.log('initiate Offer stream: ', stream);
    //console.log("offer connection: ", connection);
    connection.addStream(stream);// add our audio/video stream
    console.log("WebRTC: Added local stream");

    connection.createOffer().then(offer => {
      console.log('WebRTC: created Offer: ');
      console.log('WebRTC: Description after offer: ', offer);
      connection.setLocalDescription(offer).then(() => {
        console.log('WebRTC: set Local Description: ');
        console.log('connection before sending offer ', connection);
        setTimeout(() => {
          this.sendHubSignal(JSON.stringify({ "sdp": connection.localDescription }), partnerClientId);
        }, 1000);
      }).catch(err => console.error('WebRTC: Error while setting local description', err));
    }).catch(err => console.error('WebRTC: Error while creating offer', err));

    //connection.createOffer((desc) => { // send an offer for a connection
    //    console.log('WebRTC: created Offer: ');
    //    console.log('WebRTC: Description after offer: ', JSON.stringify(desc));
    //    connection.setLocalDescription(desc, () => {
    //        console.log('WebRTC: Description after setting locally: ', JSON.stringify(desc));
    //        console.log('WebRTC: set Local Description: ');
    //        console.log('connection.localDescription: ', JSON.stringify(connection.localDescription));
    //        sendHubSignal(JSON.stringify({ "sdp": connection.localDescription }), partnerClientId);
    //    });
    //}, errorHandler);
  }

  callbackUserMediaSuccess = (stream) => {
    console.log("WebRTC: got media stream");
    this.localStream = stream;

    const audioTracks = this.localStream.getAudioTracks();
    if (audioTracks.length > 0) {
      console.log(`Using Audio device: ${audioTracks[0].label}`);
    }
  };

  initializeUserMedia = () => {
    console.log('WebRTC: InitializeUserMedia: ');
    navigator.mediaDevices.getUserMedia(this.webrtcConstraints).then(stream => {
      // استفاده از stream
      this.callbackUserMediaSuccess(stream);
    })
      .catch(error => {
        this.errorHandler
      });
  };
  // stream removed
  callbackRemoveStream = (connection, evt) => {
    console.log('WebRTC: removing remote stream from partner window');
    // Clear out the partner window
    var otherAudio = document.querySelector('.audio.partner') as HTMLAudioElement;
    otherAudio.src = '';
  }

  callbackAddStream = (connection, evt) => {
    console.log('WebRTC: called callbackAddStream');

    // Bind the remote stream to the partner window
    //var otherVideo = document.querySelector('.video.partner');
    //attachMediaStream(otherVideo, evt.stream); // from adapter.js
    this.attachMediaStream(evt);
  }

  callbackNegotiationNeeded = (connection, evt) => {
    console.log("WebRTC: Negotiation needed...");
    //console.log("Event: ", evt);
  }

  callbackIceCandidate = (evt, connection, partnerClientId) => {
    console.log("WebRTC: Ice Candidate callback");
    //console.log("evt.candidate: ", evt.candidate);
    if (evt.candidate) {// Found a new candidate
      console.log('WebRTC: new ICE candidate');
      //console.log("evt.candidate: ", evt.candidate);
      this.sendHubSignal(JSON.stringify({ "candidate": evt.candidate }), partnerClientId);
    } else {
      // Null candidate means we are done collecting candidates.
      console.log('WebRTC: ICE candidate gathering complete');
      this.sendHubSignal(JSON.stringify({ "candidate": null }), partnerClientId);
    }
  }

  initializeConnection = (partnerClientId) => {
    console.log('WebRTC: Initializing connection...');
    //console.log("Received Param for connection: ", partnerClientId);

    var connection = new RTCPeerConnection();

    connection.onicecandidate = evt => this.callbackIceCandidate(evt, connection, partnerClientId); // ICE Candidate Callback
    //connection.onnegotiationneeded = evt => callbackNegotiationNeeded(connection, evt); // Negotiation Needed Callback
    connection.ontrack = (event) => {
      // هر stream track اضافه‌شده در event.streams هست
      const stream = event.streams[0];
      this.callbackAddStream(connection, stream);
      stream.onremovetrack = (event) => {
        const track = event.track;
        // مدیریت دستی حذف track از stream
      };

    };

    // connection.onaddstream = evt => this.callbackAddStream(connection, evt); // Add stream handler callback
    // connection.onremovestream = evt => this.callbackRemoveStream(connection, evt); // Remove stream handler callback

    this.connections[partnerClientId] = connection; // Store away the connection based on username
    //console.log(connection);
    return connection;
  }

  sendHubSignal = (candidate, partnerClientId) => {
    console.log('candidate', candidate);
    console.log('SignalR: called sendhubsignal ');
    this.wsconn.invoke('sendSignal', candidate, partnerClientId).catch(this.errorHandler);
  };


  initializeSignalR = () => {
    SignalRService.startConnection("voiceChatHub").then(() => {
      this.wsconn = SignalRService.getConnection("voiceChatHub");
      let self = this;
      if (this.wsconn.state === HubConnectionState.Connected) {
        console.log("SignalR: Connected");
        this.askUsername();

        this.wsconn.onclose(e => {
          if (e) {
            console.log("SignalR: closed with error.");
            console.log(e);
          }
          else {
            console.log("Disconnected");
          }
        });

        // Hub Callback: Update User List
        this.wsconn.on('updateUserList', (userList) => {
          this.currentCallingUser = undefined;
          this.consoleLogger('SignalR: called updateUserList' + JSON.stringify(userList));
          document.getElementById("usersLength").textContent = userList.length;

          //  $('#usersdata li.user').remove();
          this.updatedUserList = userList;
          userList.forEach(element => {


            var userIcon = '', status = '';
            if (element.username === this.username){//document.getElementById("upperUsername").textContent) {
              this.myConnectionId = element.connectionId;
              userIcon = 'icon-employee';
              status = 'Me';
            }

            if (!userIcon) {
              userIcon = element.inCall ? 'icon-smartphone-1' : 'icon-smartphone-1';
            }
            status = element.inCall ? 'In Call' : 'Available';

            // var listString = '<li class="list-group-item user" data-cid=' + element.connectionId + ' data-username=' + element.username + '>';
            // listString += '<a href="#"><div class="username"> ' + element.username + '</div>';
            // listString += '<span class="helper ' + userIcon + '" data-callstatus=' + element.inCall + '></span></a></li>';
            // document.getElementById("usersdata").append(listString);
          });
        });

        // Hub Callback: Call Accepted
        this.wsconn.on('callAccepted', (acceptingUser) => {
          console.log('SignalR: call accepted from: ' + JSON.stringify(acceptingUser) + '.  Initiating WebRTC call and offering my stream up...');

          // Callee accepted our call, let's send them an offer with our video stream
          this.initiateOffer(acceptingUser.connectionId, this.localStream); // Will use driver email in production
          // Set UI into call mode
          self.ngZone.run(() => {
            self.currentCallingMode = CallingMode.Incall;
          });
        });

        // Hub Callback: Call Declined
        this.wsconn.on('callDeclined', (decliningUser, reason) => {
          console.log('SignalR: call declined from: ' + decliningUser.connectionId);

          // Let the user know that the callee declined to talk
          alertify.error(reason);

          // Back to an idle UI
          self.ngZone.run(() => {
            self.currentCallingMode = CallingMode.Idel;
          });
        });

        // Hub Callback: Incoming Call
        this.wsconn.on('incomingCall', (callingUser) => {
          console.log('SignalR: incoming call from: ' + JSON.stringify(callingUser));

          // Ask if we want to talk
          //let self = this;
          // alertify.confirm(callingUser.username + ' is calling.  Do you want to chat?', function (e) {
          //   if (e) {
          // I want to chat
          //self.wsconn.invoke('AnswerCall', true, callingUser).catch(err => console.log(err));
          self.currentCallingUser = callingUser;
          // So lets go into call mode on the UI
          // self.ngZone.run(() => {
          //   self.currentCallingMode = CallingMode.Incall;
          // });

          // } else {
          // Go away, I don't want to chat with you
          // self.wsconn.invoke('AnswerCall', false, callingUser).catch(err => console.log(err));
          //  }
          //   });
        });

        // Hub Callback: WebRTC Signal Received
        this.wsconn.on('receiveSignal', (signalingUser, signal) => {
          //console.log('WebRTC: receive signal ');
          //console.log(signalingUser);
          //console.log('NewSignal', signal);
          this.newSignal(signalingUser.connectionId, signal);
        });

        // Hub Callback: Call Ended
        this.wsconn.on('callEnded', (signalingUser, signal) => {
          //console.log(signalingUser);
          //console.log(signal);
          this.currentCallingUser = undefined;
          console.log('SignalR: call with ' + signalingUser.connectionId + ' has ended: ' + signal);

          // Let the user know why the server says the call is over
          alertify.error(signal);

          // Close the WebRTC connection
          this.closeConnection(signalingUser.connectionId);

          // Set the UI back into idle mode

          self.ngZone.run(() => {
            self.currentCallingMode = CallingMode.Idel;
          });
        });

      }
    });
  };
  AnswerCall = () => {
    if (this.currentCallingUser) {
      this.wsconn.invoke('AnswerCall', true, this.currentCallingUser).finally(() => this.currentCallingUser = undefined).catch(err => console.log(err));
      this.ngZone.run(() => {
        this.currentCallingMode = CallingMode.Incall;
      });
    }
  }

  RejectCall = () => {
    if (this.currentCallingUser) {
      this.wsconn.invoke('AnswerCall', false, this.currentCallingUser).finally(() => this.currentCallingUser = undefined).catch(err => console.log(err));
    }
  }

  setUsername = (username) => {
    this.consoleLogger('SingnalR: setting username...');
    this.wsconn.invoke("Join", username).catch((err) => {
      this.consoleLogger(err);
      alertify.alert('<h4>Failed SignalR Connection</h4> We were not able to connect you to the signaling server.<br/><br/>Error: ' + JSON.stringify(err));
      //viewModel.Loading(false);
    });
    //WOWZA_STREAM_NAME = username;
    document.getElementById("upperUsername").textContent = username;
    //document.getElementById("username").textContent = username;
    // $("#upperUsername").text(username);
    // $('div.username').text(username);
    this.initializeUserMedia();
  };

  askUsername = () => {
    this.consoleLogger('SignalR: Asking username... ' + this.username);
    if (!this.username) {
      alertify.prompt('Select a username', 'What is your name?', '', (evt, Username) => {
        if (Username !== '')
          this.setUsername(Username);
        else
          this.generateRandomUsername();

      }, () => {
        this.generateRandomUsername();
      });
    }
    else {
      this.setUsername(this.username);
    }
  };

  generateRandomUsername = () => {
    this.consoleLogger('SignalR: Generating random username...');
    let username = 'User ' + Math.floor((Math.random() * 10000) + 1);
    alertify.success('You really need a username, so we will call you... ' + username);
    this.setUsername(username);
  };

  errorHandler = (error) => {
    if (error.message)
      alertify.alert('<h4>Error Occurred</h4></br>Error Info: ' + JSON.stringify(error.message));
    else
      alertify.alert('<h4>Error Occurred</h4></br>Error Info: ' + JSON.stringify(error));

    this.consoleLogger(error);
  };

  consoleLogger = (val) => {
    if (this.isDebugging) {
      console.log(val);
    }
  };

}
export enum CallingMode {
  Idel,
  Calling,
  Incall
}
export interface voicechatUser {
  connectionId: string,
  inCall: boolean,
  username: string
}
//Wowza WebRTC constants
const WEBRTC_CONSTRAINTS = { audio: true, video: false };
const ICE_SERVERS = [{ url: 'stun:numb.viagenie.ca' }, {
  url: 'turn:numb.viagenie.ca',
  username: 'shahzad@fms-tech.com',
  credential: 'P@ssw0rdfms'
}];
//const SERVER_URL = ""; //"wss://localhost.streamlock.net/webrtc-session.json"; set it from the hub connection
const WOWZA_APPLICATION_NAME = "webrtc";
//const WOWZA_STREAM_NAME = ""; //"myStream"; set it from the user name
const WOWZA_SESSION_ID_EMPTY = "[empty]";

const STATUS_OK = 200;
const STATUS_APPLICATION_FAILURE = 500;
const STATUS_ERROR_STARTING_APPLICATION = 501;
const STATUS_ERROR_STREAM_NOT_RUNNING = 502;
const STATUS_STREAMNAME_INUSE = 503;
const STATUS_STREAM_NOT_READY = 504;
const STATUS_ERROR_CREATE_SDP_OFFER = 505;
const STATUS_ERROR_CREATING_RTP_STREAM = 506;
const STATUS_WEBRTC_SESSION_NOT_FOUND = 507;
const STATUS_ERROR_DECODING_SDP_DATA = 508;
const STATUS_ERROR_SESSIONID_NOT_SPECIFIED = 509;

const CODEC_AUDIO_UNKNOWN = -1;
const CODEC_AUDIO_PCM_BE = 0x00;
const CODEC_AUDIO_PCM_SWF = 0x01;
const CODEC_AUDIO_AC3 = 0x01; //TODO steal this slot
const CODEC_AUDIO_MP3 = 0x02;
const CODEC_AUDIO_PCM_LE = 0x03;
const CODEC_AUDIO_NELLYMOSER_16MONO = 0x04;
const CODEC_AUDIO_NELLYMOSER_8MONO = 0x05;
const CODEC_AUDIO_NELLYMOSER = 0x06;
const CODEC_AUDIO_G711_ALAW = 0x07;
const CODEC_AUDIO_G711_MULAW = 0x08;
const CODEC_AUDIO_RESERVED = 0x09;
const CODEC_AUDIO_VORBIS = 0x09; //TODO steal this slot
const CODEC_AUDIO_AAC = 0x0a;
const CODEC_AUDIO_SPEEX = 0x0b;
const CODEC_AUDIO_OPUS = 0x0c;
const CODEC_AUDIO_MP3_8 = 0x0f;

// window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
// window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
// window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
