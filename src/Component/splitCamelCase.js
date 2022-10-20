export default function SplitCamelCase(props) {
    // props.value.replace(/([A-Z])/g, ' $1');
    const text = props.text.split(/(?=[A-Z])/).join(' ');

    return (
        <>
            <span>{text}</span>
        </>
    )
    

}