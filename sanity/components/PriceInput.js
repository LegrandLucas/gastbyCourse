import React from 'react';
import PatchEvent, { set, unset} from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)))
}

const formatMoney = Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
}).format;

export default function PriceInput({type, value, onChange, inputComponent}) {
  return (
    <div>
      <h2>{type.title} - {value ? formatMoney(value / 100) : ""}</h2>
      <p>{type.description}</p>
      <input
      type={type.name}
      value={value}
      onChange={event => onChange(createPatchFrom(event.target.value))}
      ref={inputComponent}
      />
    </div>
  );
};

// PrinceInput.focus = fucntion() {
//   this._inputElement.focus();
// };

