$(function() {
    const commentInput = $("#comment");
    const commentBtn = $(".commentBtn");
    const commentDiv = $(".comment");

    const commentRender = () =>{
        const comment = commentInput.val().trim();
        commentDiv.append("p").text(comment);

    };

    commentBtn.click((e) =>{
        e.preventDefault();
        commentRender();
    })
});