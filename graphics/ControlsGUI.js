/*
 * @author afmika
 * @email afmichael73@gmail.com
 * github.com/afmika
 */
 
class ControlsGUI {
	constructor(container) {
		if(container) {
			this.container = container;
		} else {
			throw "PLEASE DEFINE AN HTML CONTAINER  FIRST";
		}
	}

	html(html) {
		this.container.innerHTML = html;
	}
	show(text) {
		this.container.innerText = text;
	}

	appendHTML(html) {
		this.container.innerHTML += html;
	}

	appendText(text) {
		this.container.innerText += text;
	}
}