---
permalink: /camelot/faqs
layout: bunkhouse
---
{% comment %}
  Questions and answers live in _data/bunkhouse_faqs.yml.
  Question headings are plain Markdown so kramdown generates the same
  anchor IDs as before (existing deep links keep working).
{% endcomment %}

## Frequently asked questions
{: #faq-top}

{% for group in site.data.bunkhouse_faqs %}
* [{{ group.title }}](#{{ group.id }})
{%- endfor %}
{: .faq-jump-list}

{% for group in site.data.bunkhouse_faqs %}
## {{ group.title }}
{: #{{ group.id }} .faq-group-heading}

{% for q in group.questions %}
### {{ q.question }}
{: .faq-question}

{{ q.answer | replace: "%donate_link%", site.data.bunkhouse_settings.donate_link }}
{% endfor %}

[↑ Back to top](#faq-top){: .faq-back-to-top}
{% endfor %}
