export function parseCalendarDescription(description) {
  const lines = description.split('\n');

  let htmlString = '';
  
  for (const line of lines) {
    const lineSplit = line.split(', ');
    const title = lineSplit[0];
    const hashtags = lineSplit[1].split(' ');

    htmlString += '<div class="project">';
    htmlString += '<div class="project-title">' + title + '</div>';
    htmlString += '<div class="flex-container">';
    for (const hashtag of hashtags) {
      htmlString += '<div class="box-element hashtag">' + hashtag + '</div>';
    }
    htmlString += '</div>';
    htmlString += '</div>';
  }

  return htmlString;
}
