# site-builder

Builds the site from a course: the site engine (Astro), which reads a course through the spec half of the site build, the published parts the course's spec MAJOR gives from `courses/<id>/` (epic #598), and builds the pages for each channel. Its own documentation lives in `site-builder/docs/`, its decisions in `site-builder/decisions/`. Builds are deployed to the artifact repository `sebvey/feyn-site`, never from here.
