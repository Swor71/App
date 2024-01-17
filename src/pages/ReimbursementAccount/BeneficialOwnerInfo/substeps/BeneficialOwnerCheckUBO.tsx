import React, {useMemo, useState} from 'react';
import FormProvider from '@components/Form/FormProvider';
import type {Choice} from '@components/RadioButtons';
import RadioButtons from '@components/RadioButtons';
import ScreenWrapper from '@components/ScreenWrapper';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import ONYXKEYS from '@src/ONYXKEYS';

type BeneficialOwnerCheckUBOProps = {
    /** The title of the question */
    title: string;

    /** The default value of the radio button */
    defaultValue: boolean;

    /** Callback when the value is selected */
    onSelectedValue: (value: boolean) => void;
};

function BeneficialOwnerCheckUBO({title, onSelectedValue, defaultValue}: BeneficialOwnerCheckUBOProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const [value, setValue] = useState(defaultValue);

    const handleSubmit = () => {
        onSelectedValue(value);
    };
    const handleSelectUBOValue = (newValue: string) => setValue(newValue === 'true');
    const options = useMemo<Choice[]>(
        () => [
            {
                label: translate('common.yes'),
                value: 'true',
            },
            {
                label: translate('common.no'),
                value: 'false',
            },
        ],
        [translate],
    );

    return (
        <ScreenWrapper
            testID={BeneficialOwnerCheckUBO.displayName}
            style={[styles.pt0]}
        >
            {/* @ts-expect-error TODO: Remove this once FormProvider (https://github.com/Expensify/App/issues/31972) is migrated to TypeScript. */}
            <FormProvider
                formID={ONYXKEYS.REIMBURSEMENT_ACCOUNT}
                submitButtonText={translate('common.confirm')}
                onSubmit={handleSubmit}
                style={[styles.mh5, styles.flexGrow1]}
                submitButtonStyles={[styles.pb5, styles.mb0]}
            >
                <Text style={styles.textHeadline}>{title}</Text>
                <Text style={styles.pv5}>{translate('beneficialOwnerInfoStep.regulationRequiresUsToVerifyTheIdentity')}</Text>
                <RadioButtons
                    items={options}
                    onPress={handleSelectUBOValue}
                    defaultCheckedValue={defaultValue.toString()}
                />
            </FormProvider>
        </ScreenWrapper>
    );
}

BeneficialOwnerCheckUBO.displayName = 'BeneficialOwnerCheckUBO';

export default BeneficialOwnerCheckUBO;