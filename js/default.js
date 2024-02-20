let rangeMin = 20;
const range = $(".range-selected");
const rangeInput = $(".range-input input");
const valueSpan = $(".range-value min");

range.css("left", (rangeInput.eq(0).val() / rangeInput.eq(0).attr("max")) * 100 + "%");
range.css("right", 100 - (rangeInput.eq(1).val() / rangeInput.eq(1).attr("max")) * 100 + "%");

rangeInput.each(function() {
    const valueSpan = $("<span class='range-value'></span>");
    $(this).after(valueSpan);

    $(this).on("input", function(e) {
        let value = $(this).val();
        let min = $(this).attr("min") || 0;
        let max = $(this).attr("max") || 100;
        let percent = ((value - min) / (max - min)) * 100 - 4;
        let rangeValue = $(this).next();
        rangeValue.css("left", percent + '%');
        rangeValue.text(value);

        let minRange = parseInt(rangeInput.eq(0).val());
        let maxRange = parseInt(rangeInput.eq(1).val());
        if (maxRange - minRange < rangeMin) {
            if ($(this).hasClass("min")) {
                rangeInput.eq(0).val(maxRange - rangeMin);
            } else {
                let newValue = minRange + rangeMin;
                if (newValue <= rangeInput.eq(1).attr("max")) {
                    rangeInput.eq(1).val(newValue);
                } else {
                    rangeInput.eq(1).val(rangeInput.eq(1).attr("max"));
                }
            }
        } else {
            range.css("left", (minRange / rangeInput.eq(0).attr("max")) * 100 + "%");
            range.css("right", 100 - (maxRange / rangeInput.eq(1).attr("max")) * 100 + "%");
            valueSpan.text($(this).val());
        }
    });
});

$(".add-route").click(function(){
    $(this).toggleClass('active');
    $(this).find('i').toggleClass('bx-list-plus bx-list-check')
    console.log("Clicado para adicionar!");
});