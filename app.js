window.addEventListener("load", () => {
	const form = document.querySelector("form");
	const todos = document.querySelector(".todo-list");
	const inputList = document.querySelector('input[type="text"]');
	const listItemCount = document.querySelector(".item-count");
	const filterBtn = document.querySelectorAll(".options button");
	const clearCompleteBtn = document.querySelector(".clear-completed");
	const modeBtn = document.querySelector(".mode");
	const toggleMode = document.querySelector(".light-bg");
	const body = document.querySelector("body");

	const dragArea = () => {
		new Sortable(todos, {
			animation: 350,
		});
	};

	let toggle = false;
	modeBtn.addEventListener("click", () => {
		toggleMode.classList.toggle("dark-bg");
		if (!toggle) {
			modeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`;

			toggle = true;
			body.style.background = "hsl(235, 24%, 19%)";
		} else {
			modeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>`;

			toggle = false;
			body.style.background = "hsl(0, 0%, 98%)";
		}
	});

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		if (inputList.value !== "") {
			const list = document.createElement("li");
			const check = document.createElement("button");
			const todo = document.createElement("span");
			const x = document.createElement("button");

			x.classList.add("x");
			x.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>`;
			check.classList.add("not-complete");
			list.classList.add("incomplete");
			todo.innerHTML = `${inputList.value}`;

			todos.prepend(list);
			list.appendChild(check);
			list.appendChild(todo);
			list.appendChild(x);

			inputList.value = "";
			let finalCount = todos.childElementCount;
			todosHandler();
			countList(finalCount);
			filter();
			removeList();
			dragArea();
		}
	});

	const todosHandler = () => {
		const incompleteTodo = document.querySelectorAll(".not-complete");

		for (let i = 0; i < incompleteTodo.length; i++) {
			incompleteTodo[i].addEventListener("click", () => {
				incompleteTodo[
					i
				].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                <path
                    fill="none"
                    stroke="#FFF"
                    stroke-width="2"
                    d="M1 4.304L3.696 7l6-6"
                />
            </svg>`;
				incompleteTodo[i].parentElement.classList.remove("incomplete");
				incompleteTodo[i].classList.add("completed");
				incompleteTodo[i].parentElement.childNodes[1].classList.add(
					"completed-text"
				);
				incompleteTodo[i].parentElement.classList.add("completed-list");

				filter();
			});
		}
	};

	const countList = (fCount) => {
		listItemCount.innerHTML = fCount;
	};

	const filter = () => {
		const incompleteList = document.querySelectorAll(".incomplete");
		const completeList = document.querySelectorAll(".completed-list");

		for (let i = 0; i < filterBtn.length; i++) {
			filterBtn[i].addEventListener("click", () => {
				if (todos.childElementCount > 0) {
					filterBtn[0].classList.remove("active");
					filterBtn[1].classList.remove("active");
					filterBtn[2].classList.remove("active");
					console.log(todos.childElementCount);

					if (filterBtn[i].id == "complete") {
						filterBtn[i].classList.add("active");
						for (let i = 0; i < completeList.length; i++) {
							completeList[i].style.display = "flex";
						}
						for (let i = 0; i < incompleteList.length; i++) {
							incompleteList[i].style.display = "none";
						}
					} else if (filterBtn[i].id == "active") {
						filterBtn[i].classList.add("active");

						for (let i = 0; i < completeList.length; i++) {
							completeList[i].style.display = "none";
						}
						for (let i = 0; i < incompleteList.length; i++) {
							incompleteList[i].style.display = "flex";
						}
					} else if (filterBtn[i].id == "all") {
						filterBtn[i].classList.add("active");

						for (let i = 0; i < incompleteList.length; i++) {
							incompleteList[i].style.display = "flex";
						}
					}
				} else {
					filterBtn[0].classList.remove("active");
					filterBtn[1].classList.remove("active");
					filterBtn[2].classList.remove("active");
				}
			});
		}

		clearComplete(completeList);
	};

	const clearComplete = (list) => {
		for (let i = 0; i < list.length; i++) {
			clearCompleteBtn.addEventListener("click", () => {
				list[i].remove();

				let finalCount = todos.childElementCount;

				countList(finalCount);
			});
		}
	};

	const removeList = () => {
		const xBtn = document.querySelectorAll(".x");

		for (let i = 0; i < xBtn.length; i++) {
			xBtn[i].addEventListener("click", () => {
				xBtn[i].parentElement.style.animation = "removeItem 500ms ease";

				setTimeout(() => {
					xBtn[i].parentElement.remove();
					let finalCount = todos.childElementCount;

					countList(finalCount);
				}, 500);
			});
		}
	};
});
