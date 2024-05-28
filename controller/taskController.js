const Task = require("../model/Task");
const taskController = {};

taskController.createTask = async (req, res) => {
	try {
		const { task, isComplete } = req.body;
		const { userId } = req;
		if (!task) {
			return res
				.status(400)
				.json({ status: "fail", message: "Task description is required" });
		}
		const newTask = new Task({
			task,
			isComplete: isComplete || false,
			author: userId,
		});
		await newTask.save();
		res.status(200).json({ status: "ok", data: newTask });
	} catch (err) {
		res
			.status(500)
			.json({ status: "error", message: "Server error", error: err.message });
	}
};

taskController.getTasks = async (req, res) => {
	try {
		const taskList = await Task.find({}).populate("author");
		res.status(200).json({ status: "ok", data: taskList });
	} catch (err) {
		res
			.status(500)
			.json({ status: "error", message: "Server error", error: err.message });
	}
};

taskController.updateTask = async (req, res) => {
	try {
		// ID를 이용하여 할 일 조회
		const task = await Task.findById(req.params.id);
		if (!task) {
			return res
				.status(404)
				.json({ status: "fail", message: "Task not found" });
		}
		// 요청된 바디의 키값들을 순회하며 할 일 업데이트
		Object.keys(req.body).forEach((key) => {
			task[key] = req.body[key];
		});
		await task.save();
		res.status(200).json({ status: "ok", data: task });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: "error", message: "Server error" });
	}
};

taskController.deleteTask = async (req, res) => {
	try {
		// ID를 이용하여 할 일 삭제
		const deletedTask = await Task.findByIdAndDelete(req.params.id);

		// 삭제할 아이템이 없는 경우
		if (!deletedTask) {
			return res
				.status(404)
				.json({ status: "fail", message: "Task not found" });
		}

		res.status(200).json({ status: "ok", data: deletedTask });
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ status: "error", message: "Server error", error: err });
	}
};

module.exports = taskController;
