# site-builder

Builds the site from a course: the site engine (Astro), which reads a course through the spec half of the site build, the published parts the course's spec MAJOR gives from `courses/<id>/` (epic #598), and builds the pages for each channel. Its own documentation lives in `site-builder/docs/`, its decisions in `site-builder/decisions/`. Builds are deployed to the artifact repository `sebvey/feyn-site`, never from here.

The spec half is the MAJOR's `site/build/` (for `linear-course@1`, `course-specs/linear-course/1/site/build/README.md`): its `render-site <course-dir>` prints the published parts of the course, the words and the URL scheme of the site as one JSON document, which the engine validates against the MAJOR's `site/build/site.schema.yaml` and lays out, never reading a course file. The MAJOR is the one the course declares in its `course.yaml` (`spec: <name>@<MAJOR>`), as `classroom-builder/` finds `teacher/build/`.
