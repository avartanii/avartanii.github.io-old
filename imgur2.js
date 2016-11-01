/*
   This is a very simple example of a web front end for a publicly available web service.
   Due to its pedagogical nature, comments are more elaborate than they typically need to
   be, or may even be present when no developer explanation would usually be necessary.

   Further, this example uses JavaScript ES6 syntax.
   */
   "use strict";

// Yes, this is a "global." But it is a single entry point for all of the code in the module,
// and in its role as the overall controller code of the page, this is one of the acceptable
// uses for a [single!] top-level name.
//
// Module managers address even this issue, for web apps of sufficient complexity.
window.GiphySearchController = (() => {
    return {
        init: () => {
            var searchButton = $("#search-button");
            var searchTerm = $("#search-term");
            var imageResultContainer = $(".image-result-container");

            searchButton.click(() => {
                // The getJSON function initiates a connection to the web service.
                $.ajax({
                  dataType: "json",
                  url: "https://api.imgur.com/3/gallery/search/",
                  data: {q: searchTerm.val()},
                  headers: {Authorization: "Client-ID ab16bf44f450080"}
              }).done((result) => {
                    // Receiving the response renders it in an HTML element tree then
                    // appends it to the element(s) with the class image-result-container.
                    imageResultContainer.empty().append(
                        result.data.map((image) => {
                            return $("<div></div>").addClass("col-xs-2").append(
                                // $("<img/>").attr({
                                //     src: image.link,
                                //     alt: image.title
                                // })
                                    $("<a></a>").attr({
                                        href: image.link
                                        
                                    }).text(image.title)
                                    
                                    // $("<img/>").attr({
                                    //      src: image.link
                                    //      if (is_album) {
                                    //          src: image.link
                                    //      } else {
                                    //         src: "https://i.vimeocdn.com/portrait/58832_300x300"
                                    //      }
                                    // })

                                    // $("<img/>").attr({
                                    //     src: image.link
                                    //     if (is_album) {
                                    //         src: image.link
                                    //     } else {
                                    //        src: "https://i.vimeocdn.com/portrait/58832_300x300"
                                    //     }
                                    // })
                                );
                        })
                        );
                });
            });
            searchTerm.bind("input", () => {
                //searchButton.prop("disabled", !searchTerm.val());
            });

            var uploadImage = $("#upload-image");
            var image_to_upload = $("#image_to_upload");
            var fileReader = new FileReader();
            //var file_path = image_to_upload.val()

            uploadImage.click(() => {
               // alert(file_path);
               $.ajax({ 
                    url: 'https://api.imgur.com/3/upload',
                    headers: {
                        Authorization: 'Client-ID 4211f725b72b537'
                    },
                    //type: 'POST',
                    data: {
                        'image': fileReader.readAsBinaryString(image_to_upload.val()) //image_to_upload.val().split('/').pop().split('\\').pop() //.replace("C:\\fakepath\\", "") //'helloworld.jpg'
                    },
                    success: function() { console.log('cool'); }
                }); 
            });
        }
    };
})();
