interface tagsType {
    /**
     * Name of the entity or tag.
     */
    label: string;
    /**
     * Number of appearances the entity makes within the text content.
     */
    count: number;
    /**
     * Rating of the entity's relevance to the overall text content (range of 0 to 1) based on various factors.
     */
    score: number;
    /**
     * If the entity can be represented by multiple resources, all of the possible URIs will be returned.
     */
    rdfTypes?: string[];
    /**
     * This legacy field is a simplified precursor to rdfTypes, and will return either organization or person if the entity is either of those types.
     */
    type?: 'organization' | 'person';
    /**
     * Link to the primary Diffbot entity for this tag in the Diffbot Knowledge Graph. On older articles, this might be the URI to the entity at DBpedia or another data source, but in most cases it will lead to Diffbot's KG entry which will contain more information about the tag.
     */
    uri: string;
}
interface imagesType {
    /**
     * Fully resolved link to image. If the image SRC is encoded as base64 data, the complete data URI will be returned.
     */
    url: string;
    /**
     * Description or caption of the image.
     */
    title: string;
    /**
     * Height of image as (re-)sized via browser/CSS.
     */
    height: number;
    /**
     * Width of image as (re-)sized via browser/CSS.
     */
    width: number;
    /**
     * Raw image height, in pixels.
     */
    naturalHeight: number;
    /**
     * Raw image width, in pixels.
     */
    naturalWidth: number;
    /**
     * Returns true if image is identified as primary based on visual analysis.
     */
    primary: boolean;
    /**
     * Internal ID used for indexing.
     */
    diffbotUri: string;
}
interface videosType {
    /**
     * Fully resolved link to source video content.
     */
    url: string;
    /**
     * Source video height, in pixels, if available.
     */
    naturalHeight?: number;
    /**
     * Source video width, in pixels, if available.
     */
    naturalWidth?: number;
    /**
     * Returns true if video is identified as primary based on visual analysis.
     */
    primary: boolean;
    /**
     * Internal ID used for indexing.
     */
    diffbotUri: string;
}
interface authorsType {
    name: string;
    link: string;
}
interface breadcrumbType {
    name: string;
    link?: string;
}
interface objectsType {
    /**
     * Type of object (always article).
     */
    type: 'article';
    /**
     * Title of the article.
     */
    title: string;
    /**
     * Full text of the article.
     */
    text: string;
    /**
     * Diffbot-normalized HTML of the extracted article. Please see the HTML Specification for a breakdown of elements and attributes returned.
     */
    html?: string;
    /**
     * Date of extracted article, normalized in most cases to RFC 1123 (HTTP/1.1).
     */
    date: Date;
    /**
     * If an article's date is ambiguous, Diffbot will attempt to estimate a more specific timestamp using various factors. This will not be generated for articles older than two days, or articles without an identified date.
     */
    estimatedDate?: Date;
    /**
     * Article author.
     */
    author?: string;
    /**
     * URL of the author profile page, if available.
     */
    authorUrl?: string;
    /**
     * Article authors.
     */
    authors?: authorsType[];
    /**
     * Returns the (spoken/human) language of the submitted page, using two-letter ISO 639-1 nomenclature.
     */
    humanLanguage: string;
    /**
     * Number of pages automatically concatenated to form the text or html response. By default, Diffbot will automatically concatenate up to 20 pages of an article. More on automatic concatenation.
     */
    numPages?: number;
    /**
     * Array of all page URLs concatenated in a multipage article. More on automatic concatenation.
     */
    nextPages?: number;
    /**
     * The plain-text name of the site (e.g. The New York Times or Diffbot). If no site name is automatically determined, the root domain (diffbot.com) will be returned.
     */
    siteName: string;
    /**
     * If known, the region of the article publication.
     */
    publisherRegion?: string;
    /**
     * If known, the country of the article publication.
     */
    publisherCountry?: string;
    /**
     * URL of submitted page / page from which the article is extracted.
     */
    pageUrl: string;
    /**
     * Returned if the pageUrl redirects to another URL.
     */
    resolvedPageUrl?: string;
    /**
     * Array of tags/entities, generated from analysis of the extracted text and cross-referenced with DBpedia and other data sources. Language-specific tags will be returned if the source text is in English, Chinese, French, German, Spanish or Russian.
     */
    tags?: tagsType[];
    /**
     * Array of images, if present within the article body.
     */
    images?: imagesType[];
    /**
     * Array of videos, if present within the article body.
     */
    videos?: videosType[];
    /**
     * Returns a top-level array (breadcrumb) of URLs and link text from page breadcrumbs.
     */
    breadcrumb?: breadcrumbType[];
    /**
     * Unique object ID. The diffbotUri is generated from the values of various Article fields and uniquely identifies the object. This can be used for deduplication.
     */
    diffbotUri: string;
    /**
     * Returns the sentiment score of the analyzed article text, a value ranging from -1.0 (very negative) to 1.0 (very positive).
     */
    sentiment: number;
}
interface articleType {
    request?: {
        options?: string[];
        pageUrl: string;
        api: 'article';
        version: 3;
        resolvedPageUrl?: string;
    };
    objects?: [objectsType];
}
interface errorType {
    errorCode?: number | string;
    error?: string;
}
/**
 * The Article API returns data in JSON format.
 * Each V3 response includes a request object (which returns request-specific metadata), and an objects array, which will include the extracted information for all objects on a submitted page. At the moment, only a single object will be returned for Article API requests.
 * Objects in the Article API's objects array will include the following fields:
 */
export declare type diffbotArticleType = articleType & errorType;
export {};
