import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Alert, TouchableOpacity } from 'react-native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { Text } from '../Themed'
import styles from "./styles"

type PromptBoxProps = {
    prompt: string
    onDelete: any   //shhhhhhhhh
    onRegenerate: any //shhhhhh again
}

export default function PromptBox({prompt, onDelete, onRegenerate}: PromptBoxProps) {
    const {showActionSheetWithOptions} = useActionSheet();

    const showOptions = () => {
        const options = ['Delete', 'Regenerate', 'Cancel'];
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = 2;
    
        showActionSheetWithOptions({options, cancelButtonIndex, destructiveButtonIndex}, 
            (selected) => {
                switch(selected) {
                    case 1:
                        onRegenerate(prompt)
                        break;
                    case destructiveButtonIndex:
                        onDelete()
                        break;
                }
            })
    }



    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={showOptions}>
            <Ionicons name="person-circle-sharp" size={28} color="white" style={styles.avatar}/>
            <Text
            style={styles.textStyle}
            >
            {prompt}
            </Text>
            <MaterialIcons name="arrow-forward-ios" size={20} style={styles.arrowIcon}/>
      </TouchableOpacity>
    )
}