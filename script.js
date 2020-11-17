window.onload = function whenload() {
	i = 1;
	size = 15; /* size of the text */

	for (i = 1; i <= size; i++)
	{
		an_span = document.getElementById("beautiful_name" + i);
		txt_style = "animation: made_by 1.2s infinite linear " + i + "s;";
		an_span.style = txt_style;
	}
}
