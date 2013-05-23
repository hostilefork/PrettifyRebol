// Copyright (C) 2008 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* 
 *  Original Google (Apache) license as-is above 
 *  All addition work comes under this (Apache 2 license)
*/

/**
 * @fileoverview
 * Registers a language handler for Rebol
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-rebol">(rebol code)</pre>
 *
 * I used lang-lisp.js as the basis and then amended to Rebol
 *
 * "Name"    = 'Rebol'
 * "Author"  = 'Carl Sassenrath'
 * "Version" = 'rebol2|rebol3'
 * "About"   = 'Rebol - Relative Expression Based Object Language'
 *
 * @author draegtun@gmail.com
 *
 */

/**
 * History - https://github.com/draegtun/PrettifyRebol/Changes
 *
 * Contributors
 * - draegtun (Barry Walsh)
 * 
 * Grammar - http://reb4.me/r/rebol#Value
 *
 * Source - https://github.com/draegtun/PrettifyRebol
 *
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         // Rebol block/parens.  Is opn/clo really needed for Rebol?
         ['opn',             /^[\(\[]+/, null, '(['],
         ['clo',             /^[\)\]]+/, null, ')]'],
         //
         // Whitespace
         [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
         //
         // Multi-line string {braces} - allowed within:  { ^{ ^}  
         [PR['PR_STRING'],      /^\{(?:[^\}\^]|\^[\s\S])*(?:\}|$)/, null, '{}']
        ],
        [
         //
         // Keywords
         [PR['PR_KEYWORD'],     /^(?:func|print|foreach|make|replace\/all|compose|reduce|comment|probe)\b/, null],
         //
         // Types
         // -- time!
         [PR['PR_LITERAL'], /^\d{1,2}\:\d{1,2}\:\d{1,2}\b/],
         [PR['PR_LITERAL'], /^\d{1,2}\:\d{1,2}\b/],
         // -- date!
         [PR['PR_LITERAL'], /^\d{1,2}-\w{3,9}-\d{2,4}\b/],
         [PR['PR_LITERAL'], /^\d{1,2}-\d{1,2}-\d{2,4}\b/],
         [PR['PR_LITERAL'], /^\d{1,2}\/\w{3,9}\/\d{2,4}\b/],
         [PR['PR_LITERAL'], /^\d{1,2}\/\d{1,2}\/\d{2,4}\b/],
         // -- pair!
         [PR['PR_LITERAL'], /^\d+x\d+\b/],
         // -- string!
         [PR['PR_STRING'], /^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/, null, '"'],
         // -- decimal!
         [PR['PR_LITERAL'], /^\d+(?:\.\d+)\b/],
         // -- percent!
         [PR['PR_LITERAL'], /^(?:[0-9]+)\%/],
         // -- integer!
         [PR['PR_LITERAL'], /^\d+\b/],
         // -- get-word!
         [PR['PR_LITERAL'], /^\:(?:[A-Za-z0-9=\-\!\?\_\*\+\.\/\']*)/],
         // -- lit-word!
         [PR['PR_LITERAL'], /^\'(?:[A-Za-z0-9=\-\!\?\_\*\+\.\/\']*)/],
         // -- set-word!
         [PR['PR_DECLARATION'], /^(?:[A-Za-z0-9=\-\!\?\_\*\+\.\/\']*):/],
         //
         // Above is the Rebol data types grammar.  
         // Below the grammar for type! (declarations)
         [PR['PR_TYPE'],  /^(?:[A-Za-z0-9=\-\?\_\*\+\.\/]*)\!/],
         //
         // Constants (as literals! - there is no Constants token in GCP)
         [PR['PR_LITERAL'], /^\b(?:none|true|false|yes|no|on|off)\b/],
         //
         // Script tag (shebang!)
         [PR['PR_COMMENT'], /^#!(?:.*)/],
         //
         // A line comment that starts with ;
         [PR['PR_COMMENT'],     /^;[^\r\n]*/, null, ';']
        ]),
    ['rebol', 'red']);
