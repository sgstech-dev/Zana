import { Component, ElementRef, OnInit, ViewChild, HostListener, input, Input } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-model-viewer',
  standalone: true,
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss']
})
export class ModelViewerComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() width: number = 350;
  @Input() height: number = 200;
  @Input({ required: true })
  set data(val: string) {
    console.log('New input received:', val);
    this.modelData = val;
    this.loadModel(this.modelData);
  }
  private modelData:string;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngOnInit(): void {
    this.initThree();
    this.initControls();
    this.loadModel(this.data);
    this.animate();
  }

  private initThree(): void {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    //this.renderer.setSize(350,200);
    this.renderer.shadowMap.enabled = true; // Enable shadows
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene = new THREE.Scene();

    // Set a solid color background (e.g., light blue)
    //this.scene.background = new THREE.Color(0x87ceeb); // Light blue
    //this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera = new THREE.PerspectiveCamera(25, this.width / this.height, 0.1, 1000);
    this.camera.position.set(-1, 1, 5);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(0, 5, 7).normalize();
    light.castShadow = true; // Enable shadows

    // Configure shadow properties
    light.shadow.mapSize.width = 1024; // Higher value improves shadow quality
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5; // Near clipping plane
    light.shadow.camera.far = 50;  // Far clipping plane

    const pointLight = new THREE.PointLight(0xffffff, 500, 0); // (color, intensity, distance)
    pointLight.position.set(0, 10, -10); // Set the light's position

    // Optionally add a helper to visualize the light
    // const lightHelper = new THREE.PointLightHelper(pointLight, 1);
    // this.scene.add(lightHelper);

    // Create an ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2); // (color, intensity)

    // Add the light to the scene
    this.scene.add(ambientLight);
    this.scene.add(pointLight);
    this.scene.add(light);


    // Create a plane geometry
    const geometry = new THREE.PlaneGeometry(100, 100); // Width and height of the ground
    // Create a material for the ground
    const material = new THREE.MeshStandardMaterial({ color: 0x6f6552 }); // Grass green
    // Create a mesh combining geometry and material
    const ground = new THREE.Mesh(geometry, material);
    // Rotate the plane to lie flat
    ground.rotation.x = -Math.PI / 2; // Rotate 90 degrees around the X-axis
    // Optional: Enable shadow reception
    ground.receiveShadow = true;
    // Add the ground to the scene
    this.scene.add(ground);
  }

  private initControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // Smooth control movement
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1; // Minimum zoom distance
    this.controls.maxDistance = 50; // Maximum zoom distance
    this.controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation
  }

  private loadModel(base64: string): void {
    let altitude = 0;
    const loader = new GLTFLoader();

    // ✅ Convert Base64 to Blob
    const byteCharacters = atob(base64.split(',')[1]);  // Remove Base64 header
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'model/gltf-binary' });

    // ✅ Create Object URL for the Blob
    const url = URL.createObjectURL(blob);

    // ✅ Load the GLTF model from the Object URL
    loader.load(
      url,
      (gltf) => {
        gltf.scene.position.set(0, 0.3, 0);
        gltf.scene.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            (node as THREE.Mesh).castShadow = true;
          }
        });
        this.scene.add(gltf.scene);

        // ✅ Free the Object URL after loading
        URL.revokeObjectURL(url);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }

  // private loadModel(path: string): void {
  //   let altitude = 0;
  //   const loader = new GLTFLoader();
  //   loader.setPath('3dModels/f-14_tomcat/');
  //   loader.load(
  //     path,
  //     (gltf) => {
  //       gltf.scene.position.set(0, 0.3, 0);
  //       gltf.scene.traverse((node) => {
  //         if (node.isMesh) {
  //           node.castShadow = true; // Allow the mesh to cast shadows
  //         }
  //       });
  //       this.scene.add(gltf.scene);
  //       // Update altitude in the animation loop
  //   // const animate = () => {
  //   //   altitude += 0.001; // Increment altitude
  //   //   gltf.scene.position.y = altitude;
  //   //   gltf.scene.position.x = altitude*3;
  //   //   // Continue rendering
  //   //   requestAnimationFrame(animate);
  //   //   this.renderer.render(this.scene, this.camera);
  //   //   if (altitude > 0.001)
  //   //     return true;
  //   // };

  //   //animate();
  //     },
  //     undefined,
  //     (error) => {
  //       console.error('Error loading model:', error);
  //     }
  //   );
  // }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.controls.update(); // Required for damping
    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
}
