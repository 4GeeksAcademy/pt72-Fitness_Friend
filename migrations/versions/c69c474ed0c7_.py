"""empty message

Revision ID: c69c474ed0c7
Revises: 9b8c3cdfa134
Create Date: 2024-12-16 20:24:10.933490

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c69c474ed0c7'
down_revision = '9b8c3cdfa134'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorite', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False))
        batch_op.drop_index('ix_favorite_name')
        batch_op.drop_index('ix_favorite_type')
        batch_op.drop_index('ix_favorite_user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorite', schema=None) as batch_op:
        batch_op.create_index('ix_favorite_user_id', ['user_id'], unique=False)
        batch_op.create_index('ix_favorite_type', ['type'], unique=False)
        batch_op.create_index('ix_favorite_name', ['name'], unique=False)
        batch_op.drop_column('created_at')

    # ### end Alembic commands ###
