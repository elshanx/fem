-- Remove duplicate links per owner, keeping the oldest one.
DELETE FROM "Link" a
USING "Link" b
WHERE a."ownerId" = b."ownerId"
  AND a."originalUrl" = b."originalUrl"
  AND (a."createdAt", a."code") > (b."createdAt", b."code");

-- CreateIndex
CREATE UNIQUE INDEX "Link_ownerId_originalUrl_key" ON "Link"("ownerId", "originalUrl");
