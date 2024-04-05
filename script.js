<!-- Include the jsmediatags library from CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js"></script>

<!-- HTML setup -->
<input type="file" id="fileUpload" />
<div id="songInfo"></div>

<!-- JavaScript setup -->
<script>
document.getElementById('fileUpload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    jsmediatags.read(file, {
      onSuccess: function(tag) {
        const tags = tag.tags;
        document.getElementById('songInfo').innerHTML = `
          <p>Artist: ${tags.artist}</p>
          <p>Title: ${tags.title}</p>
          <p>Album: ${tags.album}</p>
        `;
        // You can also access other tags like lyrics, comments, etc.
      },
      onError: function(error) {
        console.log(error);
      }
    });
  }
});
</script>
