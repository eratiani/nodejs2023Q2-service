/*
  Warnings:

  - You are about to drop the `FavAlbum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavArtist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavAlbum" DROP CONSTRAINT "FavAlbum_albumId_fkey";

-- DropForeignKey
ALTER TABLE "FavArtist" DROP CONSTRAINT "FavArtist_artistId_fkey";

-- DropForeignKey
ALTER TABLE "FavTrack" DROP CONSTRAINT "FavTrack_trackId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "version" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "FavAlbum";

-- DropTable
DROP TABLE "FavArtist";

-- DropTable
DROP TABLE "FavTrack";

-- CreateTable
CREATE TABLE "Favorites" (
    "artists" TEXT[],
    "albums" TEXT[],
    "tracks" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_artists_albums_tracks_key" ON "Favorites"("artists", "albums", "tracks");
