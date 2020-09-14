# CWS SITE by Netlify-cms, Gatsby, redux, GraphQl, i18n, images processing


  - [netlify-cms](https://www.netlifycms.org)
  - [gatsby](https://gatsby.org)
  - [graphQl](https://graphql.org/)
  - [redux duck pattern](https://redux.js.org/style-guide/style-guide)

# Setup
```sh
$ git clone https://github.com/cwssrl/cws_site.git
$ cd cws_site
$ npm install
```

  - Development mode
        - create in root config.json
```sh
{
    "lang": "it"
}
```
This will copy data files into src to build gatsby site. In development mode, you can use only 1 lang. It's a static site!

```sh
$ npm start
```

You have now a series of available tools:
- http://localhost:8000 (gastby site)
- http://localhost:8000/admin (netlify backoffice)
- http://localhost:8000/__graphql (graphql visual query)

#### Develop Live is available on:

https://cwssite.azurewebsites.net/

user: cws

password: Bw0RIq3nlWCuUI9s

#### Wireframes and requirements are:

- https://cwsdsit.sharepoint.com/:f:/s/iot.mobility/EmTCBsgv57BEpfEbwxZwTysBQPXaaJ45KmcWBr511TMoAQ?e=7kVNid (Sharepoint)

- https://invis.io/BNWSVBPMZ9R (Wireframe Desktop)

- https://xd.adobe.com/view/5a5a3e2c-6d62-4462-4070-4349b80d7ea4-2c6b/ (Wireframe Mobile)

- Animazioni: https://projects.invisionapp.com/prototype/CWS-website-2020-Interaction-ck9l9xtft0043ta01hvpo3v01 (Wireframe Animations)



# Static Page

If you want to create a structured static page, by a set of cms data, follow these steps:
1) create a react component for your page into "src/templates" (es: contact-page.js);
2) create a cms preview file into "src/cms/preview-templates" that use contact-page.js;

```js
import React from 'react'
import PropTypes from 'prop-types'
import { ContactPageTemplate } from '../../templates/contact-page'

const ContactPagetPreview = ({ entry }) => (
  <ContactPageTemplate
    image={entry.getIn(['data', 'image'])}
    title={entry.getIn(['data', 'title'])}
  />
)

ContactPagetPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default ContactPagetPreview

```
4) register your preview template into "src/cms.js"
```js
import CMS from 'netlify-cms-app'

import BlogPostPreview from './preview-templates/BlogPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('indexEN', IndexPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('blogEN', BlogPostPreview)

CMS.registerPreviewTemplate('contact', ContactPagePreview)
CMS.registerPreviewTemplate('contactEN', ContactPagePreview)

```

5) go into static/admin/config.yml
6) search for "pages"
7) create a "file" item under "pages" item (you have to create a static page for language)

```yml
- file: "data/pages/it/contact/index.md"
        label: "Contact Page (Italian)"
        name: "contact" 
        fields:
          - {
                label: "Template Key",
                name: "templateKey",
                widget: "hidden",
                default: "contact-page"
          }
          - {
                label: Your Title,
                name: yourTitle,
                widget: string
          }
          - {
                label: Your Image,
                name: yourImage,
                widget: image
          }
          - {
                label: Your Summary,
                name: yourSummary,
                widget: string
          }
```
8) commit your changes (our netlify setup uses github as backend)
9) restart by npm start;
10) go to http://localhost:8000/admin

#DATA ENTRY

Per accedere al **CMS** e' necessario avere un account sulla piattaforma www.github.com autorizzato da **cws**.
Contatta @<Marco Allotta> per l'abilitazione e/o supporto.

Per effettuare il login al **CMS** vai al seguente indirizzo:
https://cwssite.azurewebsites.net/admin/#/

I dati per l'autenticazione della rete aziendale sono:

user: cws

password: Bw0RIq3nlWCuUI9s

Ti verra' richiesto di accedere con il tuo account github.

L'interfaccia si presenta con un Header con i link ai contenuti (_Contents_) e alla galleria multimediale (_Media_) nella sezione a sinistra, e il link Account e lo shortcut di creazione dei contenuti dinamici nella sezione a destra.

Sono poi visibili le due colonne:
1) Elenco tipologie contenuti;
2) Contenuti creati per tipologia selezionata;

I contenuti sono di 2 tipi: dinamici e statici.

#### CONTENUTI DINAMICI

I contenuti dinamici vengono creati per tipologia. Ad esempio, posso creare piu' case studies, eventi, news etc.

Nella colonna a sinistra sono tutti quei contenuti che non sono PAGES.

#### CONTENUTI STATICI (PAGES)

I contenuti statici sono dei dati strutturati per una singola pagina, ed esempio la home page, la digital transformation, chi siamo etc.

Per accedere alle pagine basta cliccare alla voce di menu PAGES della colonna a sinistra e selezionare i contenuti nella colonna centrale.

#### SALVATAGGIO E PUBBLICAZIONE CONTENUTI

I dati vengono salvati attraverso il tasto **Publish** presente in alto a destra nel form della pagina: non vengono pubblicati direttamente in produzione, ma in un ambiente di stage per i test della visualizzazione. Verranno poi pubblicati in produzione.

Il sito L'ambiente di stage e' https://cwssite.azurewebsites.net.
Utilizza l'utenza della rete aziendale presente in alto nella pagina.

#### CATEGORIES

Le categorie vengono utilizzate nei contenuti dinamici. Possono essere create categorie per lingua. Possono servire anche per relazionare i dati. Quelle tipologie di categoria devono essere create con il prefisso "data-"

#### TAGS

I tags vengono inseriti tramite un widget "list", e devono essere creati con il "-" al posto degli spazi e separati da virgola.

#### SEO

I campi predisposti per la configurazione della Search Engine Optimization sono:

1) **Page title**: e' il titolo che viene mostrato sulla finestra del browser;
2) **Meta description**: e' una breve descrizione della pagina che non e' visibile all'utente ma viene utilizzata dai bot dei motori di ricerca;
3) **Keywords**: e' una lista di parole chiave, e' possibile utilizzare gli spazi, devono essere separati da virgola. Anche questi dati servono solo ai motori di ricerca.
4) **Title**: oltre a essere il testo principale della pagina, visibile all'utente, viene utilizzato anche per generare  l' **url slug**, ovvero una versione leggibile dell'indirizzo della pagina. Ad esempio, una pagina con il titolo _Chi Siamo_ sara' raggiungibile all'indirizzo _/chi-siamo_ . 

 #### FORMATTAZIONE TESTI

I dati che prevedono una formattazione vengono creati attraverso  un semplice editor.

##### DATI CON WIDGET LIST

Alcuni campi prevedono l'inserimento di piu' blocchi di dati con la stessa struttura: ad esempio all-interno della **home page** e' possibile creare piu' **Main Sections** con i campi _Title_, _Description_, _Image_, _Image Description_. Cliccare il tasto **+** per aggiungere un nuovo blocco di dati.

#### PREVIEW CONTENUTO

Quando si accede al form di inserimento/modifica del contenuto, nella colonna a destra e' visibile un'anteprima del layout della pagina con i dati inseriti. L'anteprima viene aggiornata  ad ogni modifica del dato. Alcune parti della pagina possono non essere visibili in preview, ad esempio se prevedono una fonte dati diversi da quella della pagina. 
