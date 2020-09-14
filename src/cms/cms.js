import CMS from "netlify-cms-app";

import BlogPostPreview from "./preview-templates/BlogPostPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import CareersPagePreview from "./preview-templates/CareersPagePreview";
import DigitalTransformationGenericPagePreview from "./preview-templates/DigitalTransformationGenericPagePreview";
import DigitalTransformationPagePreview from "./preview-templates/DigitalTransformationPagePreview";
import CaseStudyPagePreview from "./preview-templates/CaseStudyPagePreview";
import CompetencePagePreview from "./preview-templates/CompetencePagePreview";
import LivionPagePreview from "./preview-templates/LivionPagePreview";
import EventPagePreview from "./preview-templates/EventPagePreview";
import PressPagePreview from "./preview-templates/PressPagePreview";
import StaticPagePreview from "./preview-templates/StaticPagePreview";
import ContactsPagePreview from "./preview-templates/ContactsPagePreview";

// TEMPLATES
CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("indexEN", IndexPagePreview);
CMS.registerPreviewTemplate("blog", BlogPostPreview);
CMS.registerPreviewTemplate("blogEN", BlogPostPreview);
CMS.registerPreviewTemplate("careersPage", CareersPagePreview);
CMS.registerPreviewTemplate(
  "digitalTransformationGenericPage",
  DigitalTransformationGenericPagePreview
);
CMS.registerPreviewTemplate(
  "digitalTransformationGenericPageEN",
  DigitalTransformationGenericPagePreview
);
CMS.registerPreviewTemplate(
  "digitalTransformation",
  DigitalTransformationPagePreview
);
CMS.registerPreviewTemplate(
  "digitalTransformationEN",
  DigitalTransformationPagePreview
);
CMS.registerPreviewTemplate("caseHistory", CaseStudyPagePreview);
CMS.registerPreviewTemplate("caseHistoryEN", CaseStudyPagePreview);
CMS.registerPreviewTemplate("competenceCenter", CompetencePagePreview);
CMS.registerPreviewTemplate("competenceCenterEN", CompetencePagePreview);
CMS.registerPreviewTemplate("livion", LivionPagePreview);
CMS.registerPreviewTemplate("livionEN", LivionPagePreview);
CMS.registerPreviewTemplate("event", EventPagePreview);
CMS.registerPreviewTemplate("eventEN", EventPagePreview);
CMS.registerPreviewTemplate("press", PressPagePreview);
CMS.registerPreviewTemplate("pressEN", PressPagePreview);
CMS.registerPreviewTemplate("statics", StaticPagePreview);
CMS.registerPreviewTemplate("staticsEN", StaticPagePreview);
CMS.registerPreviewTemplate("contacts", ContactsPagePreview);
CMS.registerPreviewTemplate("contactsEN", ContactsPagePreview);
