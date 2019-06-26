let randomTitle = "";
function getRandomTitle(){

    $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=random&grnnamespace=0&prop=revisions|images&rvprop=content",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {

            let pages = data.query.pages;
            let firstKey = Object.keys(pages)[0];
            let title = pages[firstKey].title;
            console.log(title);
            checkTitle(title, 0, pages[firstKey]);

        },
        error: function (errorMessage) {
        }

    });
}

function checkTitle(title, position, article){
    let words = title.split(" "); 
    if(words.length > 2 || title.includes("(")){
        getRandomTitle();
        return;
    }

    ajaxWiktionary(words[position], val => {
        if(val == -1){
            if(position == words.length-1){
                // $("#article").text(title);
                returnArticle(title, article);

                
                



            }
            else {
                checkTitle(title, position+1);
            }
                


        }
        else {
            getRandomTitle();
            return;
        }
    })

        
    
    



    
    

    
    
}

function ajaxWiktionary(word, callback){
    // https://en.wiktionary.org/w/api.php?action=query&titles=Bolbelasmus
    $.ajax({
        type: "GET",
        url: `https://en.wiktionary.org/w/api.php?action=query&titles=${word}&callback=?&_=1561564990200&format=json`,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            let pages = data.query.pages;
            
            let firstKey = Object.keys(pages)[0];
            callback(firstKey);
            

            
        },
        error: function (errorMessage) {
        }

    });


}