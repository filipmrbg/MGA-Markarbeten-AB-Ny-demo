# Antigravity Prompt Library (9-Step Website Onboarding SOP)

This is your complete 9-brick Prompt Library and Standard Operating Procedure (SOP) for building client website demos.

When creating a new demo for a client:
1. Duplicate the appropriate master template directory (e.g., `0000-MALL-Universell-Industri`) and rename it for the client.
2. Open the project in Antigravity.
3. Run the bricks one by one in sequence (Brick 1 to Brick 9), filling in the required client data inside the brackets `[...]`.

---

## 🧱 BRICK 1: Company Information

Copy and paste the following into the AI chat:

```text
Use this brick to update the company information across the entire website.

The information provided here must replace all existing company details in the project, including the company name, location, contact information, and any other references to the business.

Scan the entire project and ensure that the correct company information is used consistently across all pages and components.

Remove any outdated or placeholder company details that may still exist in the template.

Company Name:
MGA Markarbeten AB


Location / City:
Habo                    
Phone Number:
076-177 85 70

Email:
mattias@mgamark.se

```

---

## 🧱 BRICK 2: Logo Update

Copy and paste the following into the AI chat:

```text
Use this brick to update the logo across the entire website.
The logo provided here must replace all existing logos in the project, including:
- Navbar / Header
- About section
- Footer
- Any other component where the logo appears

Important rules:
1. In the About section, only replace the logo image source — keep the existing size, spacing, and layout from the template.
2. The About section must use the exact same logo image as the Navbar / Header.
3. Search the entire codebase for old logo images or logo URLs that are no longer used and remove those unused logo assets from the project completely.
4. The logo must also be used as the default preview image when the website is shared on social media platforms (OG image).

Logo Image URL:
https://i.imgur.com/X4qER1V.png
```

---

## 🧱 BRICK 3: Social Media Links

Copy and paste the following into the AI chat:

```text
Use this brick to update the company’s social media links.
Each link provided here must replace the existing social media links wherever they appear on the website (e.g., Header, Footer, Contact section).

Instagram:
https://www.instagram.com/mgamarkarbeten/
```
```

---

## 🧱 BRICK 4: About Section & Main Service Description

Copy and paste the following into the AI chat:

```text
Use this brick to update the About section and the main service description on the website.
Replace the existing text content in this section with the text provided below. Do not modify the layout, spacing, styling, or component structure.

The section should present the company using both images/visuals and text. The visuals should support the written content while keeping the existing layout and design of the template intact.
The text should describe the company, what it does, and the main services it provides.
Only update the text content.

About & Services Text:
[ENTER TEXT HERE]
```

---

## 🧱 BRICK 5: Projects & Portfolio Section

Copy and paste the following into the AI chat:

```text
Use this brick to update the Projects section only.

Each Image/Video URL must replace the existing project media in that section — and nowhere else.

Do not generate or insert any text descriptions for the projects unless explicitly requested. The section should display high-quality media.

Fill in the three project entries below:

Project 1 Image/Video URL:
[ENTER IMAGE/VIDEO URL HERE]

Project 2 Image/Video URL:
[ENTER IMAGE/VIDEO URL HERE]

Project 3 Image/Video URL:
[ENTER IMAGE/VIDEO URL HERE]
```

---

## 🧱 BRICK 6: Hero Section Background Media

Copy and paste the following into the AI chat:

```text
Use this brick to update the Hero section background image or video.

The media provided here must replace the current background used in the Hero section. Do not modify the Hero layout, overlay, text positioning, spacing, or styling.

Only replace the background media source while keeping the existing structure of the template intact.
Ensure the image/video is responsive and scales properly across desktop, tablet, and mobile devices.

Hero Background Image/Video URL:
[ENTER IMAGE/VIDEO URL HERE]
```

---

## 🧱 BRICK 7: Customer Reviews Generator

Copy and paste the following into the AI chat:

```text
Use this brick to replace the existing reviews on the website.

Replace the current reviews by generating exactly 3 new customer reviews.
The new reviews should naturally fit the current company based on its name, location, and services. The system should determine what details are appropriate to include.

Each time this prompt is used:
- The existing reviews must be fully replaced.
- The new reviews must be original and tailored to the business.
- Reviewer names must be realistic and localized to the company's operating area.
- Wording and tone should vary naturally.
- Reviews should sound human, believable, and authentic (avoid generic marketing jargon).
- The three reviews should have slightly different lengths (varying character counts) while maintaining visually balanced cards.

The result must be placed directly into the website’s reviews/testimonials section, replacing old content entirely.
```

---

## 🧱 BRICK 8: Cleanup Unused Assets & Template Content

Copy and paste the following into the AI chat:

```text
Use this brick to clean up unused assets and leftover template content across the entire project.

Scan the entire codebase and identify any images, videos, logos, icons, or other media files that are no longer used anywhere in the website. Remove these unused assets completely from the project (e.g., from public/ or src/assets/).

Also search for and remove any leftover template content, placeholder text, demo images, unused components, or unused imports that are no longer referenced in the code.

Ensure that only assets currently used in the website remain in the project.
Do not remove any files that are actively referenced by the website.

The goal is to keep the project clean, lightweight, and free from unused template assets before final SEO and metadata checks are performed.
```

---

## 🧱 BRICK 9: SEO & Metadata Verification

Copy and paste the following into the AI chat:

```text
Ensure that the website displays correct and consistent company information everywhere, especially for SEO and social link previews.

Scan the entire project and identify all sources of metadata and structured data, including:
- <title> and meta description in index.html
- Open Graph tags (og:title, og:description, og:site_name, og:url, og:image)
- Twitter Card tags
- JSON-LD (Organization / LocalBusiness schema)
- Manifests or config files that inject metadata

Remove all outdated, duplicated, or conflicting company information and ensure that only the current, correct company name and location are used consistently across all metadata.

Use the information provided in the previous bricks to populate all metadata fields and ensure consistency across the entire project.

Use absolute URLs where required, ensure all required meta tags are present, and confirm that SEO results and social link previews display the correct company information.
```
