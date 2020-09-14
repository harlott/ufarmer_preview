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
