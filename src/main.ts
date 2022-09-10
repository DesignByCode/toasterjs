import "./style.css"
import { NotificationType, Position, Toaster } from "./toaster"

document.querySelector("button.btn-1")!.addEventListener("click", (e) => {
  e.preventDefault()
  new Toaster({
    message: "hello world from claude myburgh",
    position: Position.topLeft,
    type: NotificationType.danger,
    autoClose: false,
    link: {
      title: "View Item",
      url: "https://google.com",
    },
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  })
})

document.querySelector("button.btn-2")!.addEventListener("click", (e) => {
  e.preventDefault()
  new Toaster({
    time: 3000,
    type: NotificationType.warning,
    position: Position.topRight,
    autoClose: false,
  })
})

document.querySelector("button.btn-3")!.addEventListener("click", (e) => {
  e.preventDefault()
  new Toaster({
    time: 3000,
    type: NotificationType.info,
    position: Position.bottomLeft,
  })
})

document.querySelector("button.btn-4")!.addEventListener("click", (e) => {
  e.preventDefault()
  new Toaster({
    time: 3000,
    type: NotificationType.success,
    position: Position.bottomRight,
  })
})

document.querySelector("button.btn-5")!.addEventListener("click", (e) => {
  e.preventDefault()
  new Toaster({
    time: 3000,
    type: NotificationType.success,
    position: Position.topCenter,
  })
})

document.querySelector("button.btn-6")!.addEventListener("click", (e) => {
  e.preventDefault()
  new Toaster({
    time: 3000,
    type: NotificationType.success,
    position: Position.bottomCenter,
  })
})

document.querySelector("button.btn-7")!.addEventListener("click", (e) => {
  e.preventDefault()
  new Toaster({
    time: 3000,
    type: NotificationType.primary,
    position: Position.center,
  })
})
