"""empty message

Revision ID: 3f258d42a2ba
Revises: f281f4e6a497
Create Date: 2024-12-15 20:14:52.410667

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3f258d42a2ba'
down_revision = 'f281f4e6a497'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorite',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('Favorites')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Favorites',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('uid', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('workout_card', sa.VARCHAR(length=2000), autoincrement=False, nullable=False),
    sa.Column('meal_card', sa.VARCHAR(length=2000), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='Favorites_pkey'),
    sa.UniqueConstraint('id', name='Favorites_id_key')
    )
    op.drop_table('favorite')
    # ### end Alembic commands ###
