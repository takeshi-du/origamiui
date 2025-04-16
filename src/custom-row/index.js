import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { ReactComponent as RowIcon } from '../../assets/images/row.svg';

registerBlockType(metadata.name, {
    icon: <RowIcon />,
    edit: Edit,
    save: Save,
});