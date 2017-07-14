import sublime
import sublime_plugin

from functools import reduce

snippets = [
  ['source.js', { 'contents': r'''function ${1}${-1:${1/.+/ /}}(${2}) {
  ${0:$TM_SELECTED_TEXT}
}''' }],
  ['meta.object.js', { 'contents': r'''${1:fn} (${2}) {
  ${0:$TM_SELECTED_TEXT}
},''' }],
  ['meta.block.js', { 'contents': r'''function ${1}${-1:${1/.+/ /}}(${2}) {
  ${0:$TM_SELECTED_TEXT}
}''' }],
  ['meta.class.js', { 'contents': r'''${1:fn} (${2}) {
  ${0:$TM_SELECTED_TEXT}
}''' }],
]

def my_score_selector(scope, selector, log):
  for i, scope_name in reversed(list(enumerate(scope.split(' ')))):
    # log("%d" % (scope_name == selector))
    if scope_name == selector:
      # log("(%d)" % (i + 1))
      return i + 1
  return 0

class MyInsertSnippet(sublime_plugin.TextCommand):
  def run(self, edit):
    i = 0
    for selection in self.view.sel():
      point = self.view.sel()[i].begin()

      mapped = map(lambda snippet: [my_score_selector(self.view.scope_name(point), snippet[0], lambda x: self.view.insert(edit, point, x)), snippet[1]], snippets)
      snippet = reduce(lambda r, x: r if r[0] > x[0] else x, mapped)

      self.view.run_command("left_delete")
      self.view.run_command("left_delete")
      self.view.run_command("insert_snippet", snippet[1])

      i += 1
