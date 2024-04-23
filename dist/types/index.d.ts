import { Vue } from 'vue-property-decorator';
import ScopedValidator from './core/scopedValidator';
export default class FormValidator extends Vue {
    $validator: ScopedValidator;
    $validations: object;
    beforeCreate(): void;
}
