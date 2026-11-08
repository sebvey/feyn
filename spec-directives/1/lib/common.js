'use strict';
// The helpers the tests of check-spec, the checks of a spec MAJOR and its builds share: a failure,
// a slug, a number as written in a course.yaml, a release heading of a CHANGELOG.md. The parser
// of a course is the spec MAJOR's, not the directives' (linear-fr: course/parser.js), since what
// a course must be to be readable is decided in the spec.
//   fail(file, line, message)  a failure, { file, line, message }, its line 1 when none is given
//   SLUG                       lowercase words joined by hyphens
//   normNumber(n)              a concept or domain number as a string, `03` read as `3`; null
//                              for what is neither a number nor a string
//   RELEASE                    a release section of a CHANGELOG.md, `## X.Y.Z, YYYY-MM-DD`

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function normNumber(n) {
  if (typeof n === 'number') return String(n);
  if (typeof n === 'string') return /^\d+$/.test(n) ? String(parseInt(n, 10)) : n;
  return null;
}

const fail = (file, line, message) => ({ file, line: line || 1, message });

// A release section of a course's CHANGELOG.md: `## X.Y.Z, YYYY-MM-DD`, below « Non publié »
// (`headings.unreleased`), newest first. Read by course-files and the site build.
const RELEASE = /^((\d+)\.(\d+)\.(\d+)), (\d{4}-\d{2}-\d{2})$/;

module.exports = { fail, normNumber, SLUG, RELEASE };
