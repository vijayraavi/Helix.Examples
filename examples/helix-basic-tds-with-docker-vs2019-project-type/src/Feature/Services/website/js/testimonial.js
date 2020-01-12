
const getTestimonialGraphQL = graph.query(`datasource: item(path: $source, language: $language) {
    Image: field(name:"Image"){
      rendered(fieldRendererParameters: $mediaUrlOptions)
    }
    Title:field(name:"Title"){
      rendered
    }
    Quote: field(name:"Quote"){
      rendered
    }
    
  }`);


const loadTestimonial = function (dataSourceId, lang, urlOptions, sourceElement) {

  getTestimonialGraphQL.merge('fetchGraphQl', { source: dataSourceId, language: lang, mediaUrlOptions: urlOptions }).then(function (response) {

    const testimonialJson = response.datasource;

    const parser = new DOMParser();
    const el = parser.parseFromString(testimonialJson.Image.rendered, "text/xml");
    let imageSrc = el.getElementsByTagName("img")[0].getAttribute("src");
    imageSrc = parser.parseFromString(imageSrc, "text/html");



    const markup = `
    <div class="testimonial-inner" style="background-image: url(${imageSrc.documentElement.textContent})">
      <h3>${testimonialJson.Title.rendered}</h3>
      ${testimonialJson.Quote.rendered}
    </div>`;


    sourceElement.innerHTML = markup;

    console.log(testimonialJson);

  }).catch(function (error) {
    console.log(error);
  });

};

document.addEventListener('DOMContentLoaded', function () {

  const testimonialElements = document.querySelectorAll(".graphQlTestimonial");
  let hasTestimonials = false;
  for (let i = 0, len = testimonialElements.length; i < len; i++) {

    if (testimonialElements[i]) {
      const id = testimonialElements[i].getAttribute("data-id");
      const lang = testimonialElements[i].getAttribute("data-lang");
      const mediaUrlOptions = testimonialElements[i].getAttribute("data-mediaUrlOptions");
      loadTestimonial(id, lang, mediaUrlOptions, testimonialElements[i]);
      hasTestimonials = true;
    }

  }

  if (hasTestimonials) {
    reactor.dispatchEvent('fetchGraphQlEvent');
  }
  

});
