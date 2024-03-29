//**************  Salute
const ELEMENT_SALUTE = document.getElementById( 'salute-animation' );
const IMAGE_1 = new Image();
const IMAGE_2 = new Image();

IMAGE_1.src = 'images/Salute-var1.png';
IMAGE_2.src = 'images/Salute-var2.png';

const IMAGE = [ IMAGE_1.src, IMAGE_2.src ];

let i = 0;

setInterval( ()=> {
    if ( i > 1 ) {
        i = 0
    }
    ELEMENT_SALUTE.src = IMAGE[i];
    i++;
}, 700 );
//****************** class of projects
class Project {
    static id = 0;
    static classOfElement = '';

    constructor( PROJECT_DATA ) { 
        this.title = PROJECT_DATA.title;
        this.description = PROJECT_DATA.description;
        this.src = PROJECT_DATA.src;
        this.gitLink = PROJECT_DATA.gitLink;
        this.demoLink = PROJECT_DATA.demoLink;
        this.type = PROJECT_DATA.type;
        Project.id++;
        Project.classOfElement = '';

        if ( this.type === 'game' ) {
            Project.classOfElement = 'projects__items--games';
        }else
            if ( this.type === 'other' ) {
                Project.classOfElement = 'projects__items--others';
            }

        //*clone the template
        const TEMPLATE = document.getElementById( 'project-item' );
        const TEMPLATE_BODY_GAMES = document.getElementsByClassName( Project.classOfElement );
        const PROJECT = TEMPLATE.content.cloneNode( true );

        TEMPLATE_BODY_GAMES[0].appendChild(PROJECT);

        //*get added element
        const projects = document.getElementsByClassName( 'projects__items--item' );
        
        for ( let i = 0; i < projects.length; i++ ) {
            if ( projects[i].getAttribute( 'id' ) === '' ) {
                projects[i].setAttribute( 'id', Project.id ); 
                projects[i].setAttribute( 'title', this.title ); 
                projects[i].setAttribute( 'description', this.description ); 
                projects[i].setAttribute( 'src', this.src ); 
                projects[i].setAttribute( 'gitLink', this.gitLink ); 
                projects[i].setAttribute( 'demoLink', this.demoLink ); 
                projects[i].setAttribute( 'demoLink', this.demoLink ); 

                //console.log( projects[i].getAttribute('title') );
                const PROJECT_IMAGE_SRC = projects[i].querySelector( 'img' );
                PROJECT_IMAGE_SRC.src = this.src;
                //console.log( IMAGE_SRC ); description__content--name-project
                const PROJECT_DESCRIPTION = projects[i].querySelector( '.description__content--name-project' );
                //console.log( PROJECT_DESCRIPTION );
                PROJECT_DESCRIPTION.textContent = this.title;
            }
        }

        //console.log( projects );
        //console.log( this );
    }
}

//************** Popup
const PAGE_POPUP = document.getElementById( 'page-popup' );
const PAGE_POPUP_CONTENT = document.getElementById( 'page-popup--content' );
const LINKS_TO_VIEW_PROJECT = document.getElementsByClassName( 'item__description--content' );
const ELEMENT_MAIN = document.getElementById( 'page' );
const EXIT_BUTTON_default = document.getElementById( 'exit-button--default' );
const EXIT_BUTTON_mini = document.getElementById( 'exit-button--mini' );
const IMAGE_EXIT_BUTTON = new Image();
const IMAGE_EXIT_BUTTON_DEFAULT = new Image();
IMAGE_EXIT_BUTTON.src = 'images/button-exit-hover.svg';
IMAGE_EXIT_BUTTON_DEFAULT.src = 'images/button-exit-default.svg';
let isActivePagePopup = false;
let windowInnerWidth = window.innerWidth;
//console.log( windowInnerWidth );
const itemsToLoad = 3;
let loadCount = 0;
let requestURL = '';
let jsonObj = {};
let projects_datas = [];

if ( !isActivePagePopup ) {
    PAGE_POPUP.style.display = 'none';
}

IMAGE_EXIT_BUTTON.addEventListener( 'load', itemLoaded, false );
IMAGE_EXIT_BUTTON_DEFAULT.addEventListener( 'load', itemLoaded, false );
requestURL = 'js/inputData.json';
request = new XMLHttpRequest();
request.open( 'GET', requestURL );
request.responseType = 'json';
request.send();
request.addEventListener( 'load', itemLoaded, false );

function itemLoaded() {
    loadCount++;
    //console.log( loadCount );
    if ( loadCount >= itemsToLoad ) {
        IMAGE_EXIT_BUTTON.removeEventListener( 'load', itemLoaded, false );
        IMAGE_EXIT_BUTTON_DEFAULT.removeEventListener( 'load', itemLoaded, false );
        request.removeEventListener( 'load', itemLoaded, false );
        jsonObj = request.response;
        //console.log( jsonObj );
        //*** add projects
        projects_datas = jsonObj.projects;
        //console.log( projects_datas );
        //********* start
        //*create projects
        for ( const PROJECT_DATA of projects_datas ) {
            const PROJECT = new Project( PROJECT_DATA );
        }
        //*addEventListeners
        for ( const link of LINKS_TO_VIEW_PROJECT ) {
            link.addEventListener( 'click', clickLinksHandler, false );
        }
        window.addEventListener( 'resize', resizeWindowHandler, false );
    }
}

function resizeWindowHandler( e ) {
    windowInnerWidth = window.innerWidth;
    //console.log( windowInnerWidth );
}

function clickLinksHandler( e ) {
    //console.log(windowInnerWidth);
    if ( isActivePagePopup ) {
        isActivePagePopup = false;
        PAGE_POPUP.style.display = 'none';
    }else
        if ( !isActivePagePopup ) {
            isActivePagePopup = true;
            PAGE_POPUP.style.display = 'flex';
            PAGE_POPUP.style.position = 'absolute';

            PAGE_POPUP.style.top = window.scrollY + ( window.innerHeight - 550 ) / 2 + 'px';
            if ( windowInnerWidth > 1024 ) {
               // console.log(windowInnerWidth);
                PAGE_POPUP.style.left = ( windowInnerWidth - 800 ) / 2 + 'px';
            }else 
                if ( windowInnerWidth > 426 &&  windowInnerWidth <= 1024 ) {
                    //console.log(windowInnerWidth);
                    PAGE_POPUP.style.left = ( windowInnerWidth - 360 ) / 2 + 'px';
                }else
                    if ( windowInnerWidth <= 426 ) {
                        //console.log(windowInnerWidth);
                        PAGE_POPUP_CONTENT.style.width = windowInnerWidth + 'px';
                        //console.log( PAGE_POPUP_CONTENT.style.width );
                        PAGE_POPUP.style.left = 0 + 'px';
                        //console.log( PAGE_POPUP.style.left );
                        EXIT_BUTTON_default.style.display = 'none';
                    }
            

            //console.log( PROJECT_TITLE, PROJECT_DESCRIPTION, PROJECT_IMAGE );
            //console.log( e.target.parentNode.parentNode.parentNode );

            const sourceElement = e.target.parentNode.parentNode.parentNode;
            const POPUP_TITLE = document.getElementById( 'project-title' );
            const POPUPT_DESCRIPTION = document.getElementById( 'project-description' );
            const POPUP_IMAGE = document.getElementById( 'project-image' );
            const POPUP_GIT_LINK = document.getElementById( 'git-link' );
            const POPUP_DEMO_LINK = document.getElementById( 'demo-link' );

            POPUP_TITLE.textContent = sourceElement.getAttribute( 'title' );
            POPUPT_DESCRIPTION.textContent = sourceElement.getAttribute( 'description' );
            POPUP_IMAGE.src = sourceElement.getAttribute( 'src' );
            POPUP_GIT_LINK.href = sourceElement.getAttribute( 'gitLink' );
            POPUP_DEMO_LINK.href = sourceElement.getAttribute( 'demoLink' );

            //console.log( sourceElement.getAttribute( 'demoLink' ) );

            for ( const link of LINKS_TO_VIEW_PROJECT ) {
                link.removeEventListener( 'click', clickLinksHandler, false );
            }

            EXIT_BUTTON_default.addEventListener( 'click', clickExitPopupHandler, false );
            EXIT_BUTTON_default.addEventListener( 'mouseover', mouseoverExitPopupHandler, false );
            EXIT_BUTTON_default.addEventListener( 'mouseout', mouseoverExitPopupHandler, false );
            EXIT_BUTTON_mini.addEventListener( 'click', clickExitPopupHandler, false );

            setTimeout( () => {
                ELEMENT_MAIN.addEventListener( 'click', clickExitPopupHandler, false )
            }, 500 );
        }
    //console.log(isActivePagePopup);
}

function mouseoverExitPopupHandler( e ) {
    if ( e.type === 'mouseover' ) {
        EXIT_BUTTON_default.src = IMAGE_EXIT_BUTTON.src;
    }else{
        EXIT_BUTTON_default.src = IMAGE_EXIT_BUTTON_DEFAULT.src;
    }
}

function clickExitPopupHandler() {
    isActivePagePopup = false;
    PAGE_POPUP.style.display = 'none';

    for ( const link of LINKS_TO_VIEW_PROJECT ) {
        link.addEventListener( 'click', clickLinksHandler, false );
    }

    ELEMENT_MAIN.removeEventListener( 'click', clickExitPopupHandler, false );
}

