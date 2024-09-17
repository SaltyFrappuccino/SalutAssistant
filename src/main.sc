require: create/createRequest.js

patterns:
    $AnyText = $nonEmptyGarbage

theme: /

    state: Start
        q!: $regex</start>
        a: Начнём.