import audienceTrack from './audience-track'
import solution from './solution'
import pricingPackage from './pricing-package'
import competitor from './competitor'
import comparisonPage from './comparison-page'
import integration from './integration'
import integrationCategory from './integration-category'
import industryPage from './industry-page'
import useCasePage from './use-case-page'
import province from './province'
import city from './city'
import helpArticle from './help-article'
import blogPost from './blog-post'

import seoFields from '../objects/seo-fields'
import publishingControls from '../objects/publishing-controls'
import portableContent from '../objects/portable-text'

export const schemaTypes = [
  // Document types (13)
  audienceTrack,
  solution,
  pricingPackage,
  competitor,
  comparisonPage,
  integration,
  integrationCategory,
  industryPage,
  useCasePage,
  province,
  city,
  helpArticle,
  blogPost,

  // Object types (3)
  seoFields,
  publishingControls,
  portableContent,
]
