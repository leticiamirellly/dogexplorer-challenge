import { mount } from '@vue/test-utils';
import BaseButton from '@/components/ui/BaseButton.vue';
import { expect, it } from 'vitest';

it('renders slot and emits click', async () => {
	const wrapper = mount(BaseButton, { slots: { default: 'Click' } });
	expect(wrapper.text()).toBe('Click');

	await wrapper.trigger('click');
	expect(wrapper.emitted('click')).toHaveLength(1);
});
