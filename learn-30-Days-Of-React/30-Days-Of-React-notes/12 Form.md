**Forms**

Form 表单通常用于录入用户输入信息， 支持非常多的 type

```html
<input type="text" />
```

常见的有

1. text
2. number
3. range
4. email
5. password
6. tel
7. checkbox
8. radio
9. color
10. url
11. image
12. file
13. hidden
14. date
15. datetime-local
16. month
17. week
18. time
19. reset
20. search
21. submit
22. button
23. 除了 input 还有 
    1. `<textarea><textarea/>`
    2. `<select><option></option><select/>`



# Exercises

## Exercises: Level 1

1. What is the importance of form?

   > form is the most common element used to collect data from a user

2. How many input types do you know?

   > 1. text
   > 2. number
   > 3. email
   > 4. tel
   > 5. password
   > 6. color
   > 7. date
   > 8. datetime-local
   > 9. button
   > 10. range
   > 11. file
   > 12. <span style="color:red">checkbox</span>
   > 13. <span style="color:red">radio</span>
   > 14. <span style="color:red">month</span>
   > 15. <span style="color:red">week</span>
   > 16. <span style="color:red">time</span>
   > 17. <span style="color:red">submit</span>
   > 18. <span style="color:red">reset</span>
   > 19. <span style="color:red">search</span>
   > 20. <span style="color:red">hidden</span>
   > 21. <span style="color:red">image</span>
   > 22. <span style="color:red">url</span>
   >
   > textarea
   >
   > select

   ```mermaid
   graph TB
   form ==> input & textarea & select
   input ==> common & user & media & time & operate
   time ==> time. & date & datetime-local & week & month
   common ==> text & number & url 
   user ==> email & tel & password
   media ==> file & color & image
   operate ==> submit & reset & button & search & hidden & checkbox & radio & range
   ```

   

3. Mention at least four attributes of an input element

   > 1. name
   > 2. id
   > 3. class
   > 4. placeholder
   > 5. value

   | Attribute                                                    | Type or Types                                                | Description                                                  |
   | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
   | [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#accept) | `file`                                                       | Hint for expected file type in file upload controls          |
   | [`alt`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#alt) | `image`                                                      | alt attribute for the image type. Required for accessibility |
   | [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocomplete) | all except `checkbox`, `radio`, and buttons                  | Hint for form autofill feature                               |
   | [`capture`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#capture) | `file`                                                       | Media capture input method in file upload controls           |
   | [`checked`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#checked) | `checkbox`, `radio`                                          | Whether the command or control is checked                    |
   | [`dirname`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#dirname) | `search`, `text`                                             | Name of form field to use for sending the element's directionality in form submission |
   | [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#disabled) | all                                                          | Whether the form control is disabled                         |
   | [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#form) | all                                                          | Associates the control with a form element                   |
   | [`formaction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formaction) | `image`, `submit`                                            | URL to use for form submission                               |
   | [`formenctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formenctype) | `image`, `submit`                                            | Form data set encoding type to use for form submission       |
   | [`formmethod`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formmethod) | `image`, `submit`                                            | HTTP method to use for form submission                       |
   | [`formnovalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formnovalidate) | `image`, `submit`                                            | Bypass form control validation for form submission           |
   | [`formtarget`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formtarget) | `image`, `submit`                                            | Browsing context for form submission                         |
   | [`height`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#height) | `image`                                                      | Same as height attribute for [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img); vertical dimension |
   | [`list`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#list) | all except `hidden`, `password`, `checkbox`, `radio`, and buttons | Value of the id attribute of the [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) of autocomplete options |
   | [`max`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max) | `date`, `month`, `week`, `time`, `datetime-local`, `range`   | Maximum value                                                |
   | [`maxlength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength) | `text`, `search`, `url`, `tel`, `email`, `password`          | Maximum length (number of characters) of `value`             |
   | [`min`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min) | `date`, `month`, `week`, `time`, `datetime-local`, `range`   | Minimum value                                                |
   | [`minlength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength) | `text`, `search`, `url`, `tel`, `email`, `password`          | Minimum length (number of characters) of `value`             |
   | [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#multiple) | `email`, `file`                                              | Boolean. Whether to allow multiple values                    |
   | [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name) | all                                                          | Name of the form control. Submitted with the form as part of a name/value pair |
   | [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern) | `text`, `search`, `url`, `tel`, `email`, `password`          | Pattern the `value` must match to be valid                   |
   | [`placeholder`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder) | `text`, `search`, `url`, `tel`, `email`, `password`, `number` | Text that appears in the form control when it has no value set |
   | [`readonly`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly) | all except `hidden`, `range`, `color`, `checkbox`, `radio`, and buttons | Boolean. The value is not editable                           |
   | [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#required) | all except `hidden`, `range`, `color`, and buttons           | Boolean. A value is required or must be check for the form to be submittable |
   | [`size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#size) | `text`, `search`, `url`, `tel`, `email`, `password`          | Size of the control                                          |
   | [`src`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#src) | `image`                                                      | Same as `src` attribute for [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img); address of image resource |
   | [`step`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step) | `date`, `month`, `week`, `time`, `datetime-local`, `range`   | Incremental values that are valid                            |
   | [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#type) | all                                                          | Type of form control                                         |
   | [`value`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value) | all                                                          | The initial value of the control                             |
   | [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#width) | `image`                                                      | Same as `width` attribute for [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) |

4. What is the importance of htmlFor?

5. Write an input type which is not given in the example if there is?

6. What is a controlled input?

7. What do you need to write a controlled input?

8. What event type do you use to listen changes on an input field?

9. What is the value of a checked checkbox?

10. When do you use onChange, onBlur, onSubmit?

11. What is the purpose of writing e.preventDefault() inside the submit handler method?

12. How do you bind data in React? The first input field example is data binding in React.

13. What is validation?

14. What is the event type you use to listen when an input changes?

15. What are event types do you use to validate an input?





遇到的一些问题以及总结:

