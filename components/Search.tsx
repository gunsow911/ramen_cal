import {useState} from "react"
import Autosuggest, {SuggestionSelectedEventData} from 'react-autosuggest';
import {RamenData} from "@/hooks/useRamenData";

type Props = {
  ramenData?: RamenData[] 
  onSearch?: (ramen: RamenData) => void
  value: string
  onValueChange?: (value: string) => void
}

const Search = (props: Props) => {
  const [suggestions, setSuggestions] = useState<RamenData[]>([]);

  const onChange = (_event: any, { newValue }: {newValue: string}) => {
    props.onValueChange && props.onValueChange(newValue);
  };
  const onSuggestionsFetchRequested = ({ value } : {value: string}) => {
    setSuggestions(() => getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion: RamenData) => (
    <div className="p-3 border border-1 cursor-pointer">
     <div className="text-lg">{suggestion.name}</div>
     <div className="text-sm text-slate-400">{suggestion.address}</div>
    </div>
  );
  const getSuggestions = (value: string) => {
    const inputValue = value.trim();
    const inputLength = inputValue.length;



    const list = inputLength === 0
      ? []
      : props
        .ramenData?.filter(
          (ramen) => ramen.name.toLowerCase().includes(inputValue.toLowerCase())
          ) ?? [];
    return list;
  };

  const onSuggestionSelected = (_event: any, data: SuggestionSelectedEventData<RamenData>) => {
    props.onSearch && props.onSearch(data.suggestion);
  }

  return (
      <Autosuggest
        
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={{
          placeholder: 'ラーメン店を検索...',
          value: props.value,
          onChange: onChange,
        }}
        theme={{
          input: 'py-1 px-2 mt-2 w-full text-lg border border-1 border-gray-300 rounded-md',
        }}
      />
  )
}

export default Search
