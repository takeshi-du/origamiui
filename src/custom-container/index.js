import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { ReactComponent as ContainerIcon } from '../../assets/images/container.svg';

registerBlockType(metadata.name, {
    icon: <ContainerIcon />,
    edit: Edit,
    save: Save,
});