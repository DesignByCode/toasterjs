import icons from "./icons"

export enum Position {
  topLeft = "top-left",
  topRight = "top-right",
  topCenter = "top-center",
  bottomLeft = "bottom-left",
  bottomRight = "bottom-right",
  bottomCenter = "bottom-center",
  center = "center",
}

export enum NotificationType {
  default = "default",
  primary = "default",
  info = "info",
  warning = "warning",
  success = "success",
  danger = "danger",
}

interface Options {
  position?: Position
  title?: string
  message?: string
  time?: number
  type?: NotificationType
  autoClose?: boolean
  image?: string
  onClose?: Function
  link?: {
    title: string
    url: string
  }
}

const classes = {
  default: "default text-gray-400",
  primary: "default text-primary-400",
  info: "info text-sky-400",
  warning: "warning text-orange-400",
  success: "success text-green-400",
  danger: "danger text-red-400",
}

export class Toaster {
  public options
  protected zIndex

  constructor(options: Options) {
    this.options = Object.assign(
      {
        position: Position.topLeft,
        title: "Successs",
        message: "",
        time: 3000,
        type: NotificationType.success,
        autoClose: true,
        onClose: () => {},
        link: {
          title: "",
          url: "",
        },
      },
      options
    )

    this.zIndex = 100

    this.init()
  }

  get container() {
    return document.querySelector(`.toast-container[data-position=${this.position}]`)
  }

  get position() {
    return this.options.position
  }

  get message() {
    if (this.options.message === "") return ""
    return `<p class="mt-1 text-sm text-gray-500">${this.options.message}</p>`
  }

  get link() {
    if (this.options.link.title === "" && this.options.link.url === "") return ""
    return `<p class="mt-1 text-sm">
      <a class="text-white bg-primary-500 px-2 py-1 rounded " href="${this.options.link.url}">${this.options.link.title}</a>
    </p>`
  }

  get imageIcon() {
    if (this.options.image) {
      return `<img height="80" width="80" class="shadow rounded object-fill" loading="lazy" src="${this.options.image}" />`
    } else {
      return icons[this.options.type]
    }
  }

  closeButton(notification: Element) {
    notification.addEventListener.bind(this)
    notification.querySelector("button")?.addEventListener("click", () => {
      this.remove(notification)
    })
  }

  init() {
    this.container || this.createContainer()
    this.createNotification()
  }

  createContainer() {
    this.zIndex++
    const div = document.createElement("div")
    div.setAttribute("class", "toast-container pointer-events-none flex fixed w-[360px] p-4")
    div.setAttribute("data-position", this.position)
    div.style.zIndex = this.zIndex.toString()
    document.body.append(div)
  }

  createNotification() {
    const notification = document.createElement("div")
    notification.setAttribute("class", "notification my-2 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden")

    notification.innerHTML = `
      <div class="p-4">
          <div class="flex items-start">
              <div class="flex-shrink-0  ${classes[this.options.type]}">
                ${this.imageIcon}
              </div>
            <div class="ml-3 w-0 flex space-y-2 flex-col flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">${this.options.title}</p>
              ${this.message}
              ${this.link}
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
    `
    this.closeButton(notification)
    if (this.container?.getAttribute("data-position")?.includes("top-")) {
      this.container!.prepend(notification)
    } else {
      this.container!.append(notification)
    }
    this.options.autoClose && this.autoClose(notification)
  }

  autoClose(notification: Element) {
    setTimeout(() => {
      this.remove(notification)
    }, this.options.time)
  }

  remove(notification: Element) {
    notification.remove()
    if (!this.container?.hasChildNodes()) {
      this.container?.remove()
    }
    this.options.onClose()
  }
}
