
const getPromoCardGraphQL = graph.query(`datasource: item(path: $source, language: $language) {
    Link: field(name:"Link"){
  	 	rendered
    }
    Image: field(name:"Image"){
      rendered(fieldRendererParameters: $mediaUrlOptions)
    }
    Headline:field(name:"Headline"){
      rendered
    }
    Text: field(name:"Text"){
      rendered
    }
    
  }`);


const loadPromoCard = function (dataSourceId, lang, urlOptions, sourceElement) {

  getPromoCardGraphQL.merge('fetchGraphQl', { source: dataSourceId, language: lang, mediaUrlOptions: urlOptions }).then(function (response) {

    const promoCardJson = response.datasource;

    const parser = new DOMParser();
    const el = parser.parseFromString(promoCardJson.Image.rendered, "text/xml");
    let imageSrc = el.getElementsByTagName("img")[0].getAttribute("src");
    imageSrc = parser.parseFromString(imageSrc, "text/html");


    const hrefElement = parser.parseFromString(promoCardJson.Link.rendered, "text/html");
    const hrefValue = hrefElement.getElementsByTagName("a")[0].getAttribute("href");

    const markup = `
      <div class="card">
        <div class="card-image">
            <figure style="background-image: url(${imageSrc.documentElement.textContent})"></figure>
        </div>
        <div class="card-content">
          <div class="content">
            <h4>${promoCardJson.Headline.rendered}</h4>
            ${promoCardJson.Text.rendered}
          </div>
          <a href="${hrefValue}" class="stretched-link"></a>
        </div>
      </div>`;


    sourceElement.innerHTML = markup;

    console.log(promoCardJson);

  }).catch(function (error) {
    console.log(error);
  });

};

document.addEventListener('DOMContentLoaded', function () {

  const promoCardElements = document.querySelectorAll(".graphQlPromoCard");
  let hasPromoCards = false;
  for (let i = 0, len = promoCardElements.length; i < len; i++) {

    if (promoCardElements[i]) {
      const id = promoCardElements[i].getAttribute("data-id");
      const lang = promoCardElements[i].getAttribute("data-lang");
      const mediaUrlOptions = promoCardElements[i].getAttribute("data-mediaUrlOptions");
      loadPromoCard(id, lang, mediaUrlOptions, promoCardElements[i]);
      hasPromoCards = true;
    }

  }

  if (hasPromoCards) {
    reactor.dispatchEvent('fetchGraphQlEvent');
  }
  

});
