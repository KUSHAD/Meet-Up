// @ts-check
getData()
async function getData() {
	const respone = await fetch('/api')
	const data = await respone.json()
	for (var item of data) {
		const root = document.createElement('p');
		const data = document.createElement('div');
		const script = document.createElement('span');
		script.innerHTML = `${item.meetingSubject} |  Room Link :- <a href='${item.roomLink}'>${item.roomLink}</a> | Date and Time Created :- ${item.completeDate} <br>`
		data.append(script)
		root.append(data);
		document.body.appendChild(root);
		data.className = `card`;
	}
}
