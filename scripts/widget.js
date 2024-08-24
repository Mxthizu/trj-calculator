export function getTRJColor(trj) {
  const trjValue = parseFloat(trj.replace("%", ""));

  if (trjValue < 80) {
    return "#FF0000"; // Rouge pour TRJ défavorable
  } else if (trjValue >= 80 && trjValue < 90) {
    return "#FFA500"; // Orange pour TRJ correct
  } else if (trjValue >= 90 && trjValue <= 100) {
    return "#008000"; // Vert pour TRJ favorable
  } else if (trjValue > 100) {
    return "#0000FF"; // Bleu pour situation de surebet
  }
}

export function createOrUpdateTRJWidget(trj) {
  let widget = document.getElementById("trj-widget");

  if (!widget) {
    widget = document.createElement("div");
    widget.id = "trj-widget";
    widget.style.position = "fixed";
    widget.style.bottom = "20px";
    widget.style.right = "20px";
    widget.style.padding = "10px";
    widget.style.color = "white";
    widget.style.borderRadius = "8px";
    widget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    widget.style.zIndex = "1000";
    document.body.appendChild(widget);
  }

  const backgroundColor = getTRJColor(trj);
  widget.style.backgroundColor = backgroundColor;
  widget.innerHTML = `<strong>TRJ Calculé :</strong> ${trj}`;
}
