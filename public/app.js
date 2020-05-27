$(document).ready(function () {
	// Grab the articles as a json
	$(document).on('click', '.scrapeBtn', handleArticleScrape);

	$.getJSON('/articles', function (data) {
		console.log('Fetching Articles');
		// For each one
		for (var i = 0; i < data.length; i++) {
			// Display the apropos information on the page
			// $("#articles").prepend("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
			$('#articles').prepend(`
    <div class="card">
    <p data-id='${data[i]._id}'>
    <b>Title: ${data[i].title}</b>
    <br>
    Summary: ${data[i].summary}
    <br>
    <a href='${data[i].link}' target="_blank">Link to Article Here</a>
    </p>
    </div>
    `);
		}
	});

	// Whenever someone clicks a p tag
	$(document).on('click', 'p', function () {
		// Empty the notes from the note section
		$('#notes').empty();
		// Save the id from the p tag
		var thisId = $(this).attr('data-id');

		// Now make an ajax call for the Article
		$.ajax({
			method: 'GET',
			url: '/articles/' + thisId,
		})
			// With that done, add the note information to the page
			.then(function (data) {
				console.log(data);
				// The title of the article
				$('#notes').append('<h2>' + data.title + '</h2>');
				// An input to enter a new title
				$('#notes').append("<input id='titleinput' name='title' >");
				// A textarea to add a new note body
				$('#notes').append("<textarea id='bodyinput' name='body'></textarea>");
				// A button to submit a new note, with the id of the article saved to it
				$('#notes').append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

				// If there's a note in the article
				if (data.note) {
					// Place the title of the note in the title input
					$('#titleinput').val(data.note.title);
					// Place the body of the note in the body textarea
					$('#bodyinput').val(data.note.body);
				}
			});
	});

	// When you click the savenote button
	$(document).on('click', '#savenote', function () {
		// Grab the id associated with the article from the submit button
		var thisId = $(this).attr('data-id');

		// Run a POST request to change the note, using what's entered in the inputs
		$.ajax({
			method: 'POST',
			url: '/articles/' + thisId,
			data: {
				// Value taken from title input
				title: $('#titleinput').val(),
				// Value taken from note textarea
				body: $('#bodyinput').val(),
			},
		})
			// With that done
			.then(function (data) {
				// Log the response
				console.log(data);
				// Empty the notes section
				$('#notes').empty();
			});

		// Also, remove the values entered in the input and textarea for note entry
		$('#titleinput').val('');
		$('#bodyinput').val('');
	});

	function handleArticleScrape() {
		// This function handles the user clicking any "scrape new article" buttons
		$.get('/scrape').then(function (data) {
			// If we are able to successfully scrape the NYTIMES and compare the articles to those
			// already in our collection, re render the articles on the page
			// and let the user know how many unique articles we were able to save
			initPage();
		});
	}
});
