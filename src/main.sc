require: actions/createFormActions.sc
require: actions/openPageActions.sc

patterns:
    $AnyText = $nonEmptyGarbage

theme: /

    state: Start
        q!: $regex</start>
        a: Начнём.