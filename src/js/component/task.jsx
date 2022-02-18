import React, { useState, useEffect } from "react";

let temporalData = [];

const url = "https://assets.breatheco.de/apis/fake/todos/user/jorgepardor";

//create your first component
const Task = () => {
	const [task, setTask] = useState([]);
	const [text, setText] = useState("");

	useEffect(() => {
		fetch(url)
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				temporalData = data;
				setTask(temporalData);
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	}, []);

	const handleChange = (event) => {
		console.log(event.target.value);
		setText(event.target.value);
	};

	const submit = () => {
		console.log(task);
		fetch(url, {
			method: "PUT",
			body: JSON.stringify([...task, { label: text, done: false }]),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				if (resp.ok) {
					console.log("se ha ejecutado correctamente");
					setTask([...task, { label: text, done: false }]);
					setText("");
				} else {
					console.log("nope, esto no ha salido bien");
				}
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	};

	const byebye = (newList) => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(newList),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				if (resp.ok) {
					console.log("se ha ejecutado correctamente");
				} else {
					console.log("nope, esto no ha salido bien");
				}
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	};

	return (
		<div className="listbox border rounded-2 col-8">
			<div className="title my-3 px-3">
				<h1 className="display-2 text-center">
					<span className="fst-italic">Mise en place</span> list 🧑‍🍳
				</h1>
			</div>

			<div className="input-group mb-3 d-flex justify-content-between px-3">
				<input
					type="text"
					className="form-control"
					placeholder="List your ingredients here"
					aria-label="List your ingredients here"
					aria-describedby="button-addon1"
					onChange={handleChange}
					value={text}
				/>
				<button
					className="btn btn-outline-success btn-sm"
					id="button-addon2"
					onClick={() => {
						submit();
					}}>
					Add item ✔️
				</button>
			</div>

			<div className="entryList">
				{task.map((value, index) => (
					<ul className="list-group px-2">
						<li
							key={value.index}
							className="list-group-item d-flex justify-content-between mb-2">
							{value.label}

							<button
								className="btn btn-outline-danger btn-sm"
								onClick={() => {
									const newList = task.filter(
										(elem) => elem.label != value.label
									);
									temporalData = newList;
									console.log(newList);

									setTask(temporalData);
									byebye(newList);
								}}>
								❌
							</button>
						</li>
					</ul>
				))}
			</div>
		</div>
	);
};
export default Task;
