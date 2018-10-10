﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RouteManagementApp.Data.Access;

namespace RouteManagementApp.Migrations
{
    [DbContext(typeof(MainContext))]
    partial class MainContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RouteManagementApp.Entities.Marker", b =>
                {
                    b.Property<int>("MarkerId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Location");

                    b.Property<string>("Name");

                    b.Property<string>("Properties");

                    b.Property<string>("Type");

                    b.HasKey("MarkerId");

                    b.ToTable("Marker");
                });

            modelBuilder.Entity("RouteManagementApp.Entities.Route", b =>
                {
                    b.Property<int>("RouteId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Bounds");

                    b.Property<string>("Created");

                    b.Property<string>("Description");

                    b.Property<int>("Distance");

                    b.Property<string>("Location");

                    b.Property<string>("Name");

                    b.Property<int>("UserId");

                    b.Property<bool>("isShared");

                    b.HasKey("RouteId");

                    b.HasIndex("UserId");

                    b.ToTable("Routes");
                });

            modelBuilder.Entity("RouteManagementApp.Entities.Section", b =>
                {
                    b.Property<int>("SectionId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Distance");

                    b.Property<int?>("MarkerId");

                    b.Property<string>("Path");

                    b.Property<int?>("SegmentId");

                    b.HasKey("SectionId");

                    b.HasIndex("MarkerId");

                    b.HasIndex("SegmentId");

                    b.ToTable("Section");
                });

            modelBuilder.Entity("RouteManagementApp.Entities.Segment", b =>
                {
                    b.Property<int>("SegmentId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comment");

                    b.Property<int>("Distance");

                    b.Property<string>("Name");

                    b.Property<string>("Properties");

                    b.Property<int?>("RouteId");

                    b.HasKey("SegmentId");

                    b.HasIndex("RouteId");

                    b.ToTable("Segment");
                });

            modelBuilder.Entity("RouteManagementApp.Entities.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RouteManagementApp.Entities.Route", b =>
                {
                    b.HasOne("RouteManagementApp.Entities.User")
                        .WithMany("Routes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RouteManagementApp.Entities.Section", b =>
                {
                    b.HasOne("RouteManagementApp.Entities.Marker", "Marker")
                        .WithMany()
                        .HasForeignKey("MarkerId");

                    b.HasOne("RouteManagementApp.Entities.Segment")
                        .WithMany("Sections")
                        .HasForeignKey("SegmentId");
                });

            modelBuilder.Entity("RouteManagementApp.Entities.Segment", b =>
                {
                    b.HasOne("RouteManagementApp.Entities.Route")
                        .WithMany("Segments")
                        .HasForeignKey("RouteId");
                });
#pragma warning restore 612, 618
        }
    }
}
