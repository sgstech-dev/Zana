#!/bin/bash

# اجرای dotnet run در بک‌گراند
cd server
dotnet run &
cd ..

# اجرای ng serve --host=127.0.0.1 در بک‌گراند
cd client
ng serve --host=127.0.0.1 -o
cd ..

# منتظر ماندن برای پروسه‌ها (اختیاری)
wait
