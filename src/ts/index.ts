const BACKEND_URL = "http://127.0.0.1:80/unmangler/unmangle?mangled="

interface Response
{
	result: string;
}

document.onreadystatechange = function()
{
	if (document.readyState === "complete")
	{
		document.getElementById("search")!.onsubmit = unmangleName;
	}
}

function unmangleName(event: Event)
{
	event.preventDefault();

	let mangledTextInput: HTMLInputElement = <HTMLInputElement> document.getElementById("txtMangled")!;
	let mangled = mangledTextInput.value!;

	let request = new XMLHttpRequest();
	request.open("GET", BACKEND_URL + mangled);
	request.onload = () =>
	{
		document.getElementById("result")!.setAttribute("class", "line");
		let unmangledTextJSON: Response = JSON.parse(request.responseText);
		let unmangledTextOutput: HTMLInputElement = <HTMLInputElement> document.getElementById("txtUnmangled")!;
		unmangledTextOutput.value = unmangledTextJSON.result;
	};
	request.onerror = () =>
	{
		alert("Error on unmangling the name. Check your browser console for details.");
	};
	request.send();
}
