import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToPDF = (tasks) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("React To-Do List ", 14, 22);
  doc.setFontSize(12);
  doc.text(`(${new Date().toISOString().split("T")[0]})`, 14, 30);

  const tableData = tasks.map((task, index) => [
    index + 1,
    task.text,
    task.date || "No due date",
    task.completed ? "complete" : "Not Complete",
  ]);

  doc.autoTable({
    head: [["S.No", "Task", "Due Date", "Status"]],
    body: tableData,
    startY: 35,
  });

  doc.save("todo-list.pdf");
};
