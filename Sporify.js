roomLogs = $.grep(Array.from(document.querySelectorAll('div')), function(e){return $.inArray("cdChatLine", e.classList) !== -1})
// Seed our pseudo page with the initial page
element = document.createElement('div');
element.innerHTML = $('html').html();
// While we haven't hurt ourselves from schrody
while (!roomLogs[0].innerText.trim().match("^SchrodingerScratchLog"))
{
	// If we can drop something, do that
	dropCat = Array.from(element.querySelectorAll('a')).find(el => ~el.href.indexOf("DROP_OBJECT"))
	if (!!dropCat)
	{
		console.log("dropping");
		$.ajax({
			async: false,
			type: 'GET',
			url: dropCat.href,
			dataType: "text",
			success: function(t)
			{
				// We use element to host the new page that comes back
				element.innerHTML = t;
			}
		});

	}
	// If we haven't dropped this turn, pick up the cat
	getCat = Array.from(element.querySelectorAll('a')).find(el => ~el.href.indexOf("PICK_CAT"))
	if (getCat !== undefined && dropCat === undefined)
	{
		console.log("picking");
		$.ajax({
			async: false,
			type: 'GET',
			url: getCat.href,
			dataType: "text",
			success: function(t)
			{
				// We use element to host the new page that comes back
				element.innerHTML = t;
			}
		});
	}
	// Oops there's no cat in this room
	else if (getCat === undefined && dropCat === undefined)
	{
		throw new Error("There is no cat in this room.");
	}
	//Update the room logs
	roomLogs = $.grep(Array.from(element.querySelectorAll('div')), function(e){return $.inArray("cdChatLine", e.classList) !== -1})
}
location.reload();