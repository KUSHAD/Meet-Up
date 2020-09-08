// @ts-check
getData();
async function getData() {
	const respone = await fetch("/api");
	const data = await respone.json();
	// console.log(data);
	for (var item of data) {
		const root = document.createElement("p");
		const data = document.createElement("div");
		const script = document.createElement("span");
		script.innerHTML = `${item.meetingSubject} |  Room Link :- <a href='${item.roomLink}'>${item.roomLink}</a> | Date and Time Created :- ${item.completeDate} <br /> <a href=''  id='${item._id}'>Delete</a>`;
		data.append(script);
		root.append(data);
		document.body.appendChild(root);
		data.className = `card`;
		document.getElementById(`${item._id}`).addEventListener("click", () => {
			// console.log('click')
			const meetingSubject = item.meetingSubject;
			const completeDate = item.completeDate;
			const roomLink = item.roomLink;
			const data = {
				meetingSubject,
				completeDate,
				roomLink,
			};
			// console.log(data);
			const options = {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			};
			fetch("/pi", options);
		});
	}
}
